import router from "@/router/index.js"

// const routeObj = routes.reduce((acc, v) => {
//     acc[v.name] = v.path
//     return acc
// }, {})

export default function(name, params = {}, query = {}, type = "object"){
    if(type == 'object'){
        return {name, params, query}
    }else if(type == 'string'){
        return router.resolve({name, params, query}).href
    }
}