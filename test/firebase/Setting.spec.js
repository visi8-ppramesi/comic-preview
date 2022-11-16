import Setting from '../../src/firebase/Setting'
import storeMock from '../__mocks__/storeMock.js'
import isEqual from 'lodash/isEqual'
import pick from 'lodash/pick'
import { processStates } from './utils/common.js'
import isEmpty from 'lodash/isEmpty'

test('Setting-Get-Collection', async () => {
    storeMock.resetState()
    const fields = Object.keys(Setting.fields)
    const setting = (await Setting.getDocuments()).map(v => pick(v.toJSON(), fields))
    const storeSetting = processStates(Setting, storeMock.getState(['settings']))
    expect(isEqual(setting, storeSetting)).toBe(true)
})

test('Setting-Update-Collection', async () => {
    storeMock.resetState()
    const setting = await Setting.getDocument('banners')
    setting.updateDocument({
        value: [{
            async_component: "new video-banner",
            target: "new target",
            target_type: "new comic",
            title: "new title",
            type: "component"
        }]
    })
    const storeSetting = storeMock.getState(['settings', 'banners'])
    expect(storeSetting.value).toEqual(expect.arrayContaining([{"async_component": "new video-banner", "target": "new target", "target_type": "new comic", "title": "new title", "type": "component"}]))
})

test('Setting-Delete-Collection', async () => {
    storeMock.resetState()
    const setting = await Setting.getDocument('banners')
    setting.deleteDocument()
    const deletedSetting = storeMock.getState(['settings', 'banners'])
    expect(deletedSetting).toBe(null)
})

test('Setting-Set-Collection', async () => {
    storeMock.resetState()
    const setting = await Setting.getDocument('banners')
    setting.setDocument({
        value: [{
            async_component: "new new video-banner",
            target: "new new target",
            target_type: "new new comic",
            title: "new new title",
            type: "component"
        }]
    })
    const storeSettingNewdoc = storeMock.getState(['settings', 'banners'])
    expect(storeSettingNewdoc.value).toEqual(expect.arrayContaining([{"async_component": "new new video-banner", "target": "new new target", "target_type": "new new comic", "title": "new new title", "type": "component"}]))

    const newSetting = await Setting.createDocument({
        value: [{
            async_component: "video-banner",
            target: "testing",
            target_type: "Comic",
            title: "testing",
            type: "component"
        }]
    })
    const storeSettingNewDoc = storeMock.getState(['settings', newSetting.id])
    expect(isEmpty(storeSettingNewDoc)).toBe(false)
})