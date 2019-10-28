import {actionsFn} from '../factories/store'
export {mutations, getters, state} from '../factories/store'
const moduleName = 'users'

export const actions = {
  ...actionsFn(moduleName),
  changePassword ({dispatch}, {oldPassword, password, repeatPassword, userId}) {
    return dispatch('api/post', {url: '/auth/chpw', data: {oldPassword, password, repeatPassword, userId}}, {root: true})
  },
  resetPassword ({dispatch}, {password, repeatPassword, user, _k}) {
    return dispatch('api/post', {url: '/auth/pwdres', data: {password, repeatPassword, user, _k}}, {root: true})
  }
}
