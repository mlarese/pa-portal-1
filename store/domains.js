import {actionsFn, state as st, mutations as mt, getters as gt} from '../factories/store'
import _keyBy from 'lodash/keyBy'
const moduleName = 'owner/domain'

export const actions = {
  ...actionsFn(moduleName),
  loadAll ({state, dispatch, commit}, {force}) {
    const url = '/domain/loadall'
    if (state.allDomains.length > 0 && !force) {
      return Promise.resolve({})
    }
    return dispatch('api/get', {url}, {root: true})
      .then(res => commit('setAllDomains', res.data))
  }
}

export const state = () => ({
  ...st(),
  allDomains: []
})

export const mutations = {
  ...mt,
  setAllDomains (s, p) {
    s.allDomains = p
  }
}

export const getters = {
  ...gt,
  allDomainsByDomain: s => _keyBy(s.allDomains, 'name')
}
