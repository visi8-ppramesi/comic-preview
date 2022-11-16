const sfcCompiler = require("@vue/compiler-sfc");
const fs = require("fs");
const { minify } = require('terser')
const { minify: htmlMinify } = require('html-minifier-terser')
const isObject = require('lodash/isObject')
const isArray = require('lodash/isArray');

const types = [Object, Array, String, Number]
const typesStr = ['Object', 'Array', 'String', 'Number']

const parsePropsObject = (obj) => {
    const keys = Object.keys(obj)
    const funcReplacers = []
    keys.map((key) => {
        const value = obj[key]
        const innerKeys = Object.keys(value)
        innerKeys.forEach((innerKey) => {
            if(types.includes(obj[key][innerKey])){
                obj[key][innerKey] = obj[key][innerKey].toString().match(/^function (?<type>.*)\(\) { \[native code\] }$/).groups.type
            }else if(typeof obj[key][innerKey] === 'function'){
                const funcStr = obj[key][innerKey].toString()
                obj[key][innerKey] = funcStr
                funcReplacers.push(funcStr)
            }
        })
    })

    let jsonStr = JSON.stringify(obj)

    typesStr.forEach((type) => {
        jsonStr = jsonStr.replace(`"${type}"`, type)
        jsonStr = jsonStr.replace(`'${type}'`, type)
    })

    funcReplacers.forEach((f) => {
        jsonStr = jsonStr.replace(`"${f}"`, f)
        jsonStr = jsonStr.replace(`'${f}'`, f)
    })

    return '(' + jsonStr + ')'
}

const asyncComponentConvert = async function(vueStr){
    const parsed = sfcCompiler.parse(vueStr)
    if (!parsed.descriptor) {
        return;
    }

    const script = parsed.descriptor.script.content
    const EXPORT_DEFAULT = 'export default '
    const startPos = script.indexOf(EXPORT_DEFAULT)
    const vueObjStr = 'x=' + script.substring(startPos + EXPORT_DEFAULT.length)
    const { code } = await minify(vueObjStr).then((v) => {
        v.code = v.code.replace('x=', '')
        v.code = v.code.substring(0, v.code.length - 1)
        return v
    })
    const vueObj = eval(`(${code})`)
    const stringifiedObj = {}
    if('name' in vueObj){
        stringifiedObj.name = vueObj.name
    }
    if('props' in vueObj){
        if(isArray(vueObj.props)){
            stringifiedObj.props = JSON.stringify(vueObj.props)
        }else if(isObject(vueObj.props)){
            stringifiedObj.props = parsePropsObject(vueObj.props)
        }
        // stringifiedObj.props = JSON.stringify(vueObj.props, function(){

        // })
    }
    if('data' in vueObj){
        stringifiedObj.data = vueObj.data.toString()
    }
    if('methods' in vueObj){
        const methodsStr = Object.keys(vueObj.methods).map((key) => {
            const functionStr = vueObj.methods[key].toString();
            if(/^\([a-zA-Z]*\)=>/.test(functionStr)){
                return `${key}:${functionStr}`
            }else{
                return functionStr
            }
        }).join(',')
        stringifiedObj.methods = `({${methodsStr}})`
    }
    ['created', 'mounted', 'beforeUnmount'].forEach((methodName) => {
        if(methodName in vueObj){
            const re = new RegExp(`^${methodName}\\(\\)`)
            const rawCode = vueObj[methodName].toString()
            if(re.test(rawCode)){
                const createdStr = rawCode
                const reCode = new RegExp(`^${methodName}\\(\\)\\{(?<code>.*)\\}`)
                stringifiedObj[methodName] = `${methodName}(){${createdStr.match(reCode).groups.code}}`
            }else if(/^\(\)(\s?)=>(\s?)(\(|{)/.test(rawCode)){
                stringifiedObj[methodName] = rawCode
            }
        }
    })
    stringifiedObj.template = await htmlMinify(parsed.descriptor.template.content, {
        collapseWhitespace: true,
        collapseInlineTagWhitespace: true,
        caseSensitive: true
    })

    return stringifiedObj
    // // Object.keys(vueObj).forEach((key) => {
    // //     if(typeof vueObj[key] === 'function'){
    // //         console.log(vueObj[key].toString())
    // //         // minify(vueObj[key].toString()).then((minified) => {
    // //         //     vueObj[key] = minified.code
    // //         // })
    // //     }
    // // })
    // console.log(JSON.stringify(vueObj, function(key, val) {
    //     if (typeof val === 'function') {
    //       return (val + '').replace(key + '()', '() =>' ); // implicitly `toString` it
    //     }
    //     return val;
    //   }))
}

const fileConverter = function(filePath){
    const str = fs.readFileSync(filePath, "utf8")
    return asyncComponentConvert(str)
}

if (require.main === module) {
    const argv = require("minimist")(process.argv.slice(2))
    fileConverter(argv.path).then(console.log)
} else {
    module.exports = asyncComponentConvert
}


// function convertSFC(filePath) {
//   try {
//     fs.readFile(filePath, "utf8", (err, data) => {
//       if (err) {
//         console.log(err);
//       } else {
//         try {
//           const parsed = sfcCompiler.parse(data);
//           if (!parsed.descriptor) {
//             return;
//           }
//           let templateEncoded = parsed.descriptor.template
//               ? parsed.descriptor.template.content
//                   .replace(/[\n\r]/gi, " ")
//                   .replace(/\"/gi, '\\"')
//                   .replace(/\s\s+/gi, " ")
//               : null,
//             templateLine = templateEncoded ? `\ntemplate: "${templateEncoded}",\n` : "",
//             justScript = parsed.descriptor.script.content,
//             startPos = justScript.indexOf(COMPONENT_START),
//             scriptAndTemplate =
//               justScript.substring(0, startPos + COMPONENT_START.length) +
//               templateLine +
//               justScript.substring(startPos + COMPONENT_START.length);
//           fs.writeFile(
//             filePath.replace("vue", "ts"),
//             scriptAndTemplate,
//             (err) => {
//               if (err) throw err;
//               console.log(`The file ${filePath} has been created!`);
//             }
//           );
//         } catch (parseError) {
//           console.log(parseError);
//         }
//       }
//     });
//   } catch (readError) {
//     console.log(readError);
//   }
// }

// glob("**/*.vue", {}, (err, files) => {
//   console.log(`Convert ${files.length} SFCs...`);
//   files.forEach((filePath) => {
//     convertSFC(filePath);
//   });
// });