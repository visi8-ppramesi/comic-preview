import { defineAsyncComponent, markRaw } from 'vue'


export const buildComponentParam = ({name, template, created = null, mounted = null, methods = null, props = null, data = null, computed = null}) => {
    const param = {
        name,
        template
    }
    if(created){
        //created(){}
        if(/^created\(\)/.test(created)){
            const code = created.match(/^created\(\){(?<code>.*)}$/).groups.code
            param.created = function(){
                eval(code)
            }
        //() => {}
        }else if(/^\(\)(\s?)=>(\s?)(\(|{)/.test(created)){
            param.created = eval(created)
        }else{
            param.created = function(){
                eval(created)
            }
        }
    }
    if(mounted){
        //mounted(){}
        if(/^mounted\(\)/.test(mounted)){
            const code = mounted.match(/^mounted\(\){(?<code>.*)}$/).groups.code
            param.mounted = function(){
                eval(code)
            }
        //() => {}
        }else if(/^\(\)(\s?)=>(\s?)(\(|{)/.test(mounted)){
            param.mounted = eval(mounted)
        }else{
            param.mounted = function(){
                eval(mounted)
            }
        }
    }
    if(methods){
        //({...})
        if(/^(\(\{).*(\}\))$/.test(methods)){
            param.methods = eval(methods)
        //{...}
        }else if(/^(\{).*(\})$/.test(methods)){
            param.methods = eval(`(${methods})`)
        }
    }
    if(props){
        if(/^(\(\{).*(\}\))$/.test(props)){
            param.props = eval(props)
        }else if(/^(\{).*(\})$/.test(props)){
            param.props = eval(`(${props})`)
        }
    }
    if(computed){
        if(/^(\(\{).*(\}\))$/.test(computed)){
            param.computed = eval(computed)
        }else if(/^(\{).*(\})$/.test(computed)){
            param.computed = eval(`(${computed})`)
        }
    }
    if(data){
        if(/^\(\)(\s?)=>(\s?)(\(|{)/.test(data)){
            param.data = eval(data)
        }else{
            if(/^(\{).*(\})$/.test(data)){
                data = `(${data})`
            }
            param.data = function(){
                return eval(data)
            }
        }
    }
    return param
}

export default function(fetcher, loaderComponent = null){
    const asyncLoaderParam = {
        loader: async () => {
            try{
                const vueObj = await fetcher()
                return buildComponentParam({...vueObj})
            }catch(err){
                console.error(err)
                throw err
            }
        }
    }
    if(loaderComponent){
        asyncLoaderParam.loadingComponent = loaderComponent
    }
    
    return markRaw(defineAsyncComponent(asyncLoaderParam))
}