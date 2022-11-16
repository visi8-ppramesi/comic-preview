const { ref, listAll, updateMetadata } = require('firebase/storage')
const { storage, signInPromise } = require('../firebase.js')

// recursively traverse firebase storage
const traverseStorageAndSetMetadata = async (path) => {
    const stRef = ref(storage, path)
    const list = await listAll(stRef)
    const promises = []

    const dirs = list.prefixes
    if(dirs.length > 0){
        for(let i = 0; i < dirs.length; i++){
            promises.push(traverseStorageAndSetMetadata(dirs[i]))
        }
    }

    const files = list.items
    if(files.length > 0){
        for(let j = 0; j < files.length; j++){
            promises.push(updateMetadata(files[j], { cacheControl: 'public,max-age=86400' }))
        }
    }

    return Promise.all(promises)
}

signInPromise.then(() => {
    traverseStorageAndSetMetadata('/').then(() => {
        console.log('done')
        process.exit(0)
    })
})