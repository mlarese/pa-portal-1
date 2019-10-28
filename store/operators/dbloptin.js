import {mutations as m, actionsFn, state as s, getters as g} from '../../factories/store'
const moduleName = 'dbloptin'

export const actions = {
  ...actionsFn(moduleName),
  loadOwners ({state, dispatch, commit}) {
    const url = `/customercare/owners`
    return dispatch('api/get', {url}, {root: true})
      .then(response => commit('setOwnerList', response.data))
  },
  loadDblOptinOwners ({state, dispatch, commit}) {
    const url = `/customercare/dbloptinlist`
    return dispatch('api/get', {url}, {root: true})
      .then(response => commit('setDbloptinList', response.data))
  }
}
export const state = () => ({
  ...s(),
  ownerList: [],
  dbloptinList: []
})

export const mutations = {
  ...m,
  setOwnerList (state, payload) {
    state.ownerList = payload
  },
  setDbloptinList (state, payload) {
    state.dbloptinList = payload
  }
}

export const getters = {
  ...g
}
