import { ProfilePicture } from '../../../src/firebase/types/index.js'
import isEqual from 'lodash/isEqual'
import pick from 'lodash/pick'
import isNil from 'lodash/isNil'

const defaults = {
    'ProfilePicture': 'gs://comics-77200.appspot.com/default_profile.jpeg'
}

const defaultDownloadUrl = 'https://example.com/image.jpg'
const defaultDataUrl = 'data:image/jpeg;base64,UjBsR09EbGhBUUFCQUFBQUFDSDVCQUVLQUFFQUxBQUFBQUFCQUFFQUFBSUNUQUVBT3c9PQ=='

Array.prototype.findAllIndexes = function(checkFunc){
    return this.reduce((acc, val, idx) => {
        if(checkFunc(val, idx)){
            acc.push(idx)
        }
        return acc
    }, [])
}

Object.isObject = function(obj){
    return obj.constructor === Object
}

export const diff = function(aParam, bParam){
    let objDepth = 0
    let comparisons = 0
    const diffWrapper = (a, b, depth = 0) => {
        if(depth > objDepth){
            objDepth = depth
        }
        if(Array.isArray(a) && Array.isArray(b)){
            return a.reduce((acc, v, idx) => {
                if(isNil(b[idx])){
                    acc += 1
                    comparisons += 1
                }else if(Array.isArray(a[idx]) || Object.isObject(a[idx])){
                    acc += diffWrapper(a[idx], b[idx], depth + 1)
                }else{
                    if(a[idx] !== b[idx]){
                        acc += 1
                    }
                    comparisons += 1
                }
                return acc
            }, 0)
        }else if(Object.isObject(a) && Object.isObject(b)){
            const keys = Object.keys(a)
            return keys.reduce((acc, key) => {
                if(isNil(b[key])){
                    acc += 1
                    comparisons += 1
                }else if(Array.isArray(a[key]) || Object.isObject(a[key])){
                    acc += diffWrapper(a[key], b[key], depth + 1)
                }else{
                    if(a[key] !== b[key]){
                        acc += 1
                    }
                    comparisons += 1
                }
                return acc
            }, 0)
        }else{
            return 1
        }
    }
    const differences = diffWrapper(aParam, bParam)
    return { depth: objDepth, comparisons, differences }
}

export const isCloseEnough = (objA, objB, threshold = 1) => {
    const { comparisons, differences } = diff(objA, objB)
    return { closeEnough: (differences / comparisons) <= threshold, differences, comparisons }
}

export const processStates = function(collection, states){
    const fields = Object.keys(collection.fields)
    const fieldTypes = Object.values(collection.fields)
    const fieldNames = Object.values(collection.fields).map(v => v.name)

    const profilePictureIndexes = fieldTypes.findAllIndexes(val => val == ProfilePicture)
    return Object.values(states).map(v => pick(v, fields)).map(v => {
        profilePictureIndexes.forEach(idx => {
            if(!v[fields[idx]]){
                v[fields[idx]] = defaults[fieldNames[idx]]
            }
        })
        return v
    })
}

export const processStatesWithDownloadUrl = function(collection, states, storageFields){
    const fields = Object.keys(collection.fields)
    return Object.values(states).map(v => pick(v, fields)).map(v => {
        storageFields.forEach(field => {
            v[field] = defaultDownloadUrl
        })
        return v
    })
}

export const processStatesWithDataUrl = function(collection, states, storageFields){
    const fields = Object.keys(collection.fields)
    return Object.values(states).map(v => pick(v, fields)).map(v => {
        storageFields.forEach(field => {
            v[field] = defaultDataUrl
        })
        return v
    })
}