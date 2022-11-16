import axios from 'axios'
import comicStore from './idbStore.js'

let images = {}

// function e(e){let n=e.length,t=new Uint8Array(n+1);t[0]=e[0];for(let r=0;r<n;r++)t[r+1]=e[r]^e[(r+1)%n];return t}
// function d(e){let n=e.length,t=new Uint8Array(n-1);t[0]=e[1]^e[0];for(let r=1;r<n;r++)t[r]=e[r+1]^t[(r+(n-1))%n];let l=t.length,_=new Uint8Array(l);for(let o=0;o<l;o++)_[o]=t[(o+(l-1))%l];return _}

function e(b, type){if(b instanceof ArrayBuffer){b=new type(b)}let len=b.length; let t=new type(len + 1); t[0]=b[0]; for (let i=0; i < len; i++){t[i + 1]=b[i] ^ b[(i + 1) % len];}return t;}
function d(s, type){let length=s.length; let chars=new type(length - 1); chars[0]=s[1] ^ s[0]; for (let i=1; i < length; i++){chars[i]=s[i + 1] ^ chars[(i + (length - 1)) % length];}let len=chars.length; let result=new type(len); for (let i=0; i < len; i++){result[i]=chars[(i + (len - 1)) % len];}return result;}

export default {
    data: null,
    createImageBlob(url, identifier, type = "image/jpeg", forceRefetch = false) {
        if (process.env.VUE_APP_USE_COMIC_IDB === 'true') {
            return comicStore.checkState(identifier).then((item) => {
                if (!item || forceRefetch) {
                    return axios.get(url, { responseType: 'blob' })
                        .then((resp) => {
                            this.data = resp.data
                            const blob = new Blob([this.data], { type })
                            return blob.arrayBuffer();
                        }).then((buf) => {
                            // const uintArr = new Uint8Array(buf)
                            comicStore.setState(identifier, e(buf, Uint8Array))
                            images[identifier] = URL.createObjectURL(new Blob([buf], { type }))
                            return images[identifier]
                        })
                } else {
                    return comicStore.getState(identifier).then((buf) => {
                        images[identifier] = URL.createObjectURL(new Blob([d(buf, Uint8Array)], { type }))
                        return images[identifier]
                    })
                }
            })
        } else {
            return axios.get(url, { responseType: 'blob' })
                .then((resp) => {
                    this.data = resp.data
                    const blob = new Blob([this.data], { type })
                    return blob.arrayBuffer();
                }).then((buf) => {
                    images[identifier] = URL.createObjectURL(new Blob([buf], { type }))
                    return images[identifier]
                })
        }

    },
    revokeImageBlob(identifier) {
        setTimeout(() => {
            this.data = null
            URL.revokeObjectURL(images[identifier])
            delete images[identifier]
            // delete images[Object.keys(images).find(key => images[key] === url)]
            // URL.revokeObjectURL(url)
        }, 0)
    },
    getBlob(identifier) {
        return images[identifier]
    },
    getImages() {
        return images
    },
    destroyBlobImages() {
        images = {}
    }
}
