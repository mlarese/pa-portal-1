import {actionsFn, mutations as mu, getters as ge, state as st} from '../factories/store'
import _merge from 'lodash/merge'
import _get from 'lodash/get'
import _set from 'lodash/set'
import Vue from 'vue'
const moduleName = 'owner/layout'

export const actions = {
  ...actionsFn(moduleName),
  addLayout ({commit}, {layout, code}) {
    return commit('addLayout', {layout, code})
  }
}

let tmpState = {
  owner: {},
  ui: {
    tabLanguage: 'it',
    currentLayout: 'default'
  }
}

_merge(tmpState, st())

export const state = () => tmpState

export const getters = {
  ...ge,
  getSubject: s => _get(s.list, `['${s.ui.currentLayout}'].subject['${s.ui.tabLanguage}']`, ''),
  getText: s => _get(s.list, `['${s.ui.currentLayout}'].text['${s.ui.tabLanguage}']`, ''),
  getCode: s => _get(s.list, `['${s.ui.currentLayout}'].code`, ''),
  getLogo: s => _get(s.list, `['${s.ui.currentLayout}'].logo`, ''),
  getTermId: s => _get(s.list, `['${s.ui.currentLayout}'].termid`, ''),
  getStructure: s => _get(s.list, `['${s.ui.currentLayout}'].structure`, ''),
  getDomain: s => _get(s.list, `['${s.ui.currentLayout}'].domain`, '')
}
export const mutations = {
  addLayout (s, {layout, code}) { Vue.set(s.list, code, layout) },
  setTabLanguage (s, p) { s.ui.tabLanguage = p },
  setCurrentLayout (s, p = 'default') { s.ui.currentLayout = p },
  setOwner (s, p) { s.owner = p },
  setSubject (s, p) { _set(s.list, `['${s.ui.currentLayout}'].subject['${s.ui.tabLanguage}']`, p) },
  setText (s, p) { _set(s.list, `['${s.ui.currentLayout}'].text['${s.ui.tabLanguage}']`, p) },
  setCode (s, p) { _set(s.list, `['${s.ui.currentLayout}'].code`, p) },
  setStructure (s, p) { _set(s.list, `['${s.ui.currentLayout}'].structure`, p) },
  setLogo (s, p) { _set(s.list, `['${s.ui.currentLayout}'].logo`, p) },
  setTermId (s, p) { _set(s.list, `['${s.ui.currentLayout}'].termid`, p) },
  setDomain (s, p) { _set(s.list, `['${s.ui.currentLayout}'].domain`, p) },
  ...mu
}
