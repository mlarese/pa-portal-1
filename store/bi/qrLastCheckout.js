import {actionsFn, state as s, mutations as mu, getters as ge} from '../../factories/store'
import uuid from 'uuid/v4'
import _keyBy from 'lodash/keyBy'
const moduleName = 'bi/qrLastCheckout'

export const actions = {
  ...actionsFn(moduleName),
  /** ******* result list **********/
  saveResultList ({dispatch, commit, state}, description) {
    const data = {
      id: 'bi-result-' + uuid(),
      creationDate: new Date(),
      description,
      data: state.list,
      filter: state.filter
    }
    return dispatch('api/post', {url: '/bi/resultlist', data}, {root: true})
  },
  loadResultListRecord ({dispatch, commit, state}, id) {
    return dispatch('api/get', {url: '/bi/resultlist/' + id}, {root: true})
      .then(res => {
        commit('setList', res.data.data)
        commit('setFilter', res.data.filter)
      })
  },
  loadResultList ({dispatch, commit, state}) {
    return dispatch('api/get', {url: '/bi/resultlist'}, {root: true})
      .then(res => commit('setResultList', res.data))
  },
  loadFilterOptions ({dispatch, commit, state}) {
    return dispatch('api/get', {url: '/bi/bioptions'}, {root: true})
      .then(res => commit('setFilterOptions', res.data))
  },
  /** ******* result list **********/
  loadData ({dispatch, commit, state, rootState}, {force = true, options = {}}) {
    if (!force && state.loaded) {
      return
    }

    let data = {
      bi: state.filter,
      treatments: rootState.terms.termFilter,
      domain: 'all'
    }
    // console.dir(state.filter)
    return dispatch('api/post', {url: `/bi/datamart/qbase`, data, options, debug: false}, {root: true})
      .then(res => {
        commit('setListParametric', {data: res.data['qbase']['result'], listName: 'list'})
        commit('setListParametric', {data: res.data['qbase']['pv'], listName: 'privaciesList'})
        return res
      })
  }
}

export const mutations = {
  ...mu,
  setFilterOptions (s, p) { s.filterOptions = p },
  setResultList (s, p) { s.resultList = p },
  togglePanelFilter (s, p) {
    s.panelFilter = {predictiveFltPanelOpen: p, queryFltPanelOpen: p}
  },
  resetFilter (s) {
    s.list = []
    s.privaciesList = []
    s.panelFilter = {predictiveFltPanelOpen: true, queryFltPanelOpen: true}
    s.filter = {
      dirty: false,
      time_range_type: 'days',
      leadtime: [],
      product: [],
      origin: [],
      channel: [],
      language: [],
      nationality: [],
      paxtype: []
    }
  }
}

export const getters = {
  ...ge,
  privaciesByEmail: (s) => _keyBy(s.privaciesList, 'email')
}

export const state = () => ({
  ...s(),
  timeRange: [{value: 'days', label: 'Giorni'}, {value: 'months', label: 'Mesi'}, {value: 'years', label: 'Anni'}],
  resultList: [],
  privaciesList: [],
  filterOptions: {},
  panelFilter: {predictiveFltPanelOpen: true, queryFltPanelOpen: true}
})
