import UserRole from '../../src/firebase/UserRole'
import storeMock from '../__mocks__/storeMock.js'
import isEqual from 'lodash/isEqual'
import pick from 'lodash/pick'
import { processStates } from './utils/common.js'
import isEmpty from 'lodash/isEmpty'

test('UserRole-Get-Collection', async () => {
    storeMock.resetState()
    const fields = Object.keys(UserRole.fields)
    const userRole = (await UserRole.getDocuments()).map(v => pick(v.toJSON(), fields))
    const storeUserRoles = processStates(UserRole, storeMock.getState(['user_roles']))
    expect(isEqual(userRole, storeUserRoles)).toBe(false)
})

test('UserRole-Update-Collection', async () => {
    storeMock.resetState()
    const userRole = await UserRole.getDocument('user-1')
    userRole.updateDocument({roles: ['user']})
    const storeUserRole = storeMock.getState(['user_roles', 'user-1'])
    expect(storeUserRole.roles).toEqual(expect.arrayContaining(['user']))
})

test('UserRole-Delete-Collection', async () => {
    storeMock.resetState()
    const userRole = await UserRole.getDocument('user-1')
    userRole.deleteDocument()
    const deletedUserRole = storeMock.getState(['user_roles', 'user-1'])
    expect(deletedUserRole).toBe(null)
})

// test('UserRole-Set-Collection', async () => {
//     storeMock.resetState()
//     const userRole = await UserRole.getDocument('user-1')
//     userRole.setDocument({roles: ['new new role name']})
//     const storeUserRoleNewdoc = storeMock.getState(['user_roles', 'user-1'])
//     expect(storeUserRoleNewdoc.roles).toEqual(expect.arrayContaining(['new new role name']))

//     const newUserRole = await UserRole.createDocument({
//         roles: ['user']
//     })
//     const storeUserRoleNewDoc = storeMock.getState(['user_roles', newUserRole.id])
//     expect(isEmpty(storeUserRoleNewDoc)).toBe(false)
// })