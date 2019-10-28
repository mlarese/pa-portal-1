import {actionsFn, state as s, mutations as m, getters as g} from '../../factories/store'
const moduleName = 'bi/demografic'
const root = {root: true}

export const actions = {
  ...actionsFn(moduleName),
  loadData ({dispatch, commit, state}, {force = true, options = {}}) {
    if (!force && state.loaded) {
      return
    }

    return dispatch('api/get', {url: `/bi/datamart/demografic`, options, debug: false}, root)
      .then(res => {
        commit('setListParametric', {data: res.data['origin-paxtype'], listName: 'channelPaxList'})
        commit('setListParametric', {data: res.data['paxtype-origin'], listName: 'paxChannelList'})
        commit('setListParametric', {data: res.data['month-origin-paxtype'], listName: 'monthPaxList'})
        commit('setListParametric', {data: res.data['month-paxtype-origin'], listName: 'monthChannelList'})
        return res
      })
  }
}
export const state = () => ({
  ...s(),
  channelPaxList: [],
  paxChannelList: [],
  monthChannelList: [],
  monthPaxList: []
})

export const getters = {
  ...g
}

export const mutations = {
  ...m
}
