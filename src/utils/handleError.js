import emitter from './emitter.js'
import Toaster from './toaster.js'
// import app from '../main.js'

export const errorTypes = {
    comicNotFoundError: new Error('comic not found'),
    chapterNotFoundError: new Error('chapter not found'),
    getDocumentError: new Error('get document error')
}

export default function(err, type){
    switch(type){
        case 'loginError':
            emitter.emit('loginError')
            break;
        case 'registerError':
            emitter.emit('registerError')
            break;
        case 'getDocumentError':
            Toaster.open({
                message: "Something went wrong!",
                type: "error",
                duration: 5000,
                dismissible: true,
                position: 'bottom'
            })            
            // app._instance.proxy.$toast.open({
            //     message: "Something went wrong!",
            //     type: "error",
            //     duration: 5000,
            //     dismissible: true,
            //     position: 'bottom'
            // })
            break;
        case 'getDocumentsError':
            Toaster.open({
                message: "Something went wrong!",
                type: "error",
                duration: 5000,
                dismissible: true,
                position: 'bottom'
            })
            // app._instance.proxy.$toast.open({
            //     message: "Something went wrong!",
            //     type: "error",
            //     duration: 5000,
            //     dismissible: true,
            //     position: 'bottom'
            // })
            break;
        case 'generateDocumentsError':
            Toaster.open({
                message: "Generate documents error!",
                type: "error",
                duration: 5000,
                dismissible: true,
                position: 'bottom'
            })
            // app._instance.proxy.$toast.open({
            //     message: "Something went wrong!",
            //     type: "error",
            //     duration: 5000,
            //     dismissible: true,
            //     position: 'bottom'
            // })
            break;
        case 'favoriteError':
            Toaster.open({
                message: "Favorite error!",
                type: "error",
                duration: 5000,
                dismissible: true,
                position: 'bottom'
            })
            // app._instance.proxy.$toast.open({
            //     message: "Something went wrong!",
            //     type: "error",
            //     duration: 5000,
            //     dismissible: true,
            //     position: 'bottom'
            // })
            break;
        case 'deleteCommentError':
            Toaster.open({
                message: "Can't delete comment! Something went wrong!",
                type: "error",
                duration: 5000,
                dismissible: true,
                position: 'bottom'
            })
            // app._instance.proxy.$toast.open({
            //     message: "Can't delete comment! Something went wrong!",
            //     type: "error",
            //     duration: 5000,
            //     dismissible: true,
            //     position: 'bottom'
            // })
            break;
        case 'testError':
            Toaster.open({
                message: "Can't delete comment! Something went wrong!",
                type: "error",
                duration: 5000,
                dismissible: true,
                position: 'bottom'
            })
            break;
        default:
            break;
    }
    return err
}