const fs = require('fs')
const path = require('path')
const sceneStub = fs.readFileSync(path.resolve(__dirname, 'stubs', 'Scene.html.stub'), 'utf8');
const { id, cx, cy, cz, sx, sy, sz, m, o } = require('minimist')(process.argv.slice(2));

const cleanUp = (html) => {
    return html.replace(/\t/g, '').replace(/   /g, '').replace(/\n/g, '').replace(/\r/g, '').replace(/  /g, ' ')
}

/*
    %%id%%
    %%model_url%%
    %%camera_position_x%%
    %%camera_position_y%%
    %%camera_position_z%%
    %%entity_scale_x%%
    %%entity_scale_y%%
    %%entity_scale_z%%
*/
const replaceValues = (html, id, { cameraX, cameraY, cameraZ }, { scaleX, scaleY, scaleZ }, modelUrl = null) => {
    let replaced = html
        .replace(/%%id%%/g, id)
        .replace(/%%camera_position_x%%/g, cameraX)
        .replace(/%%camera_position_y%%/g, cameraY)
        .replace(/%%camera_position_z%%/g, cameraZ)
        .replace(/%%entity_scale_x%%/g, scaleX)
        .replace(/%%entity_scale_y%%/g, scaleY)
        .replace(/%%entity_scale_z%%/g, scaleZ)
    
    if(modelUrl){
        replaced = replaced.replace(/%%model_url%%/g, modelUrl)
    }

    return replaced
}

const sceneHtml = replaceValues(
    cleanUp(sceneStub), 
    id,
    {
        cameraX: cx,
        cameraY: cy,
        cameraZ: cz
    },
    {
        scaleX: sx,
        scaleY: sy,
        scaleZ: sz
    },
    m
)
if(o){
    fs.writeFileSync(path.resolve(__dirname, 'scenes', o), sceneHtml)
}else{
    console.log(sceneHtml)
}