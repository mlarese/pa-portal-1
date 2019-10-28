import {actionsFn, state as s, getters as g} from '../../factories/store'
export {mutations} from '../../factories/store'

const moduleName = 'bi/dashmonthyear'
const root = {root: true}
export const actions = {
  ...actionsFn(moduleName),
  init ({commit}) {
  },
  loadData ({dispatch, commit, state}, {force = true, options = {}}) {
    if (!force && state.loaded) {
      return
    }

    return dispatch('api/get', {url: `/bi/datamart/monthyear`, options, debug: false}, root)
      .then(res => {
        commit('setListParametric', {data: res.data['month-origin'], listName: 'monthChannelList'})

        return res
      })
  }
}
export const state = () => ({
  ...s(),
  monthChannelList: []
})

export const getters = {
  ...g
}
