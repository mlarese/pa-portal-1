import {mutations as m, actionsFn, state as s, getters as g} from '../../factories/store'
const moduleName = 'dashboard'

export const actions = {
  ...actionsFn(moduleName),
  loadOwners ({state, dispatch, commit}) {
    const url = `/customercare/owners`
    return dispatch('api/get', {url}, {root: true})
      .then(response => commit('setOwnerList', response.data))
  },
  loadWidgets ({state, dispatch, commit}) {
    const url = `/customercare/widgets`
    return dispatch('api/get', {url}, {root: true})
      .then(response => commit('setWidgetList', response.data))
  }
}
export const state = () => ({
  ...s(),
  ownerList: [],
  widgetList: []
})

export const mutations = {
  ...m,
  setOwnerList (state, payload) {
    state.ownerList = payload
  },
  setWidgetList (state, payload) {
    state.widgetList = payload
  }
}

export const getters = {
  ...g
}
