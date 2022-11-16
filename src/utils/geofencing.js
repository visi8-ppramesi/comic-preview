import axios from 'axios'
import isNil from 'lodash/isNil'

const allowed = [
    "Asia/Bangkok",
    "Asia/Brunei",
    "Asia/Dili",
    "Asia/Jakarta",
    "Asia/Jayapura",
    "Asia/Kuala_Lumpur",
    "Asia/Kuching",
    "Asia/Makassar",
    "Asia/Manila",
    "Asia/Phnom_Penh",
    "Asia/Pontianak",
    "Asia/Rangoon",
    "Asia/Saigon",
    "Asia/Singapore",
]
const checkFirst = [
    null,
    'UTC'
]
const currentTZ = Intl.DateTimeFormat().resolvedOptions().timeZone;

const toInIdObjStr = (status) => {
    return JSON.stringify({
        status,
        expire: new Date((new Date).getTime() + (parseInt(process.env.VUE_APP_GEOFENCE_STORAGE_EXPIRE || 604800000)))
    })
}

const isAllowed = async () => {
    const fromLocalStorage = JSON.parse(localStorage.getItem('inIndonesia') || '{}')
    if(!isNil(fromLocalStorage?.expire) && new Date(fromLocalStorage.expire) > new Date()){
        return fromLocalStorage.status
    }
    if(allowed.includes(currentTZ)){
        localStorage.setItem('inIndonesia', toInIdObjStr(true))
        return true
    }

    if(checkFirst.includes(currentTZ) || /^Asia\//.test(currentTZ)){
        const country = await axios
            .get('https://ipinfo.io/?token=a885dadad494bc')
            .then(response => response.data.country)
            //eslint-disable-next-line no-unused-vars
            .catch(v => null)
        localStorage.setItem('inIndonesia', toInIdObjStr('ID' == country))
        return 'ID' == country
    }

    localStorage.setItem('inIndonesia', toInIdObjStr(false))
    return false
}

export default isAllowed()