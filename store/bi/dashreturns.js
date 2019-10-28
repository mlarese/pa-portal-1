import {actionsFn, state as s, getters as g} from '../../factories/store'
export {mutations} from '../../factories/store'

const moduleName = 'bi/dashreturns'
const root = {root: true}
export const actions = {
  ...actionsFn(moduleName),
  init ({commit}) {
  },
  loadData ({dispatch, commit, state}, {force = true, options = {}}) {
    if (!force && state.loaded) {
      return
    }

    return dispatch('api/get', {url: `/bi/datamart/returns`, options, debug: false}, root)
      .then(res => {
        commit('setListParametric', {data: res.data['returns'], listName: 'returnsList'})

        return res
      })
  }
}
export const state = () => ({
  ...s(),
  returnsList: []
})

export const getters = {
  ...g
}
