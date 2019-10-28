import {actionsFn, state as s} from '../../factories/store'
export {mutations, getters} from '../../factories/store'
const moduleName = 'owner/userrequest'

export const actions = {
  ...actionsFn(moduleName),
  sendEmail ({dispatch, commit, state}, {email, id}) {
    let url = `/owner/userrequestsendm?email=${email}&id=${id}`
    return dispatch('api/get', {url, options: {}, debug: false}, {root: true})
      .then(() => dispatch('loadOpen'))
  },
  loadOpen ({dispatch, commit, state}) {
    let url = `/owner/userrequesto`
    return dispatch('api/get', {url, options: {}, debug: false}, {root: true})
      .then(res => {
        commit('setList', res.data)
        return res
      })
  },
  closeRequest ({dispatch, commit, state}, id) {
    return dispatch('api/put', {url: `/owner/userrequestc/${id}`, options: {}, debug: false}, {root: true})
  }
}
export const state = () => ({
  ...s(),
  status: [
    { text: 'open' },
    { text: 'started' },
    { text: 'completed' },
    { text: 'process' },
    { text: 'succes' },
    { text: 'failed' },
    { text: 'stoped' }
  ]
})
