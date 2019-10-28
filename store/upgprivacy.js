import {mutations as m, actionsFn, state as s, getters as g} from '../factories/store'
const moduleName = 'upgprivacy'

export const actions = {
  ...actionsFn(moduleName),
  loadUpgrade ({state, dispatch, commit}) {
    const url = `/surfer/upgprivacy`
    return dispatch('api/get', {url}, {root: true})
      .then(response => commit('$record', response.data))
  }
}

export const state = () => ({
  ...s()
})

export const mutations = {
  ...m
}

export const getters = {
  ...g
}
