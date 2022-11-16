import isNil from 'lodash/isNil'
import { openDB } from 'idb'

class Store {
    constructor(ttl = 86400000) {
        this.state = {}
        this.expirations = {}
        this.deleter = {}
        this.ttl = ttl
        this.dbPromise = openDB('comic-store', 1, {
            upgrade(db){
                db.createObjectStore('comic')
            }
        })
        this.dbPromise.then((db) => {
            db.getAllKeys('comic').then((keys) => {
                keys.filter(v => v.endsWith('_expiration')).map((exp) => {
                    db.get('comic', exp).then((expDate) => {
                        if(expDate < (new Date()).getTime()){
                            const id = exp.split('_')[0]
                            this.deleteState(id)
                        }
                    })
                })
            })
        })
    }

    lock() {
        this.locked = true
    }

    unlock() {
        this.locked = false
    }

    async resetState() {
        (await this.dbPromise).clear('comic')
    }

    async checkState(key) {
        const expiration = await (await this.dbPromise).get('comic', [key, 'expiration'].join('_'))
        const state = await (await this.dbPromise).get('comic', key)

        const isExpired = expiration < (new Date()).getTime()
        const isGone = isNil(state)
        if (isExpired) {
            this.deleteState(key)
        }
        return !isGone && !isExpired
    }

    async getState(key) {
        console.log('cache hit ' + key)
        const checking = await this.checkState(key)
        if(checking){
            return (await this.dbPromise).get('comic', key)
        }else{
            return null
        }
    }

    async resetTimer(key) {
        const expiration = (new Date()).getTime() + this.ttl;
        (await this.dbPromise).put('comic', expiration, [key, 'expiration'].join('_'))
    }

    async setState(key, value) {
        if (this.locked) return
        this.lock()
        console.log('setting state ' + key)
        this.resetTimer(key);
        (await this.dbPromise).put('comic', value, key)
        this.unlock()
    }

    async deleteState(key) {
        if (this.locked) return
        this.lock()
        console.log('deleting state ' + key);
        (await this.dbPromise).delete('comic', [key, 'expiration'].join('_'));
        (await this.dbPromise).delete('comic', key)
        this.unlock()
    }

    async getKeys(){
        return (await this.dbPromise).getAllKeys('comic');
    }

    getDbPromise(){
        return this.dbPromise
    }
}

export default new Store()