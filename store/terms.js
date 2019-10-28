import {actionsFn, mutations as gm, getters as gg, state as st} from '../factories/store'
import _debounce from 'lodash/debounce'
import _merge from 'lodash/merge'
import _isString from 'lodash/isString'
import _keyBy from 'lodash/keyBy'
import Vue from 'vue'

export const moduleName = 'owner/term'
const debUpdateParagraph = _debounce((s, {value, index, language, commit}) => commit('updateParagraph', {value, index, language}), 0)
const debUpdateTitle = _debounce((s, {value, index, language, commit}) => commit('updateTitle', {value, index, language}), 0)

export const mutations = {
  setTermFilterTreatment (s, {code, value}) {
    // console.dir(s.termFilter[code])
    Vue.set(s.termFilter[code].treatment, 'selecteed', value)
  },
  setTermFilter (s, p) {
    s.termFilter = p
  },
  setTabLanguage (s, p) { s.ui.tabLanguage = p },
  updateParagraph (s, {value, index, language}) {
    s.ui.paragraphsDirty = true
    s.$record.paragraphs[index].text[language] = value
  },
  updateTitle (s, {value, index, language}) {
    s.ui.paragraphsDirty = true
    if (_isString(s.$record.paragraphs[index].title)) {
      s.$record.paragraphs[index].title = {}
    }
    s.$record.paragraphs[index].title[language] = value
  },
  addTreatment (s, index) {
    s.$record.paragraphs[index].treatments.push({ mandatory: false, restrictive: false, name: '', text: {it: ''} })
  },
  addHistory (s, history) {
    if (s.$record) {
      if (!s.$record.options) {
        s.$record.options = {history: []}
      }
      if (s.$record.options.length) {
        s.$record.options = {history: []}
      }
      if (!s.$record.options.history) {
        s.$record.options.history = []
      }

      s.$record.options.history.push(history)
    }
  }
}

const absTerm = {uid: 'abs-default-term', name: 'Informativa da abs'}
export const getters = {
  ...gg,
  termsMap: (s, g) => {
    let res = _keyBy(s.list, 'uid')
    res[absTerm.uid] = absTerm
    return res
  }
}

let tmpState = {
  ui: {
    tabLanguage: 'it',
    paragraphsDirty: false,
    termFilter: {}
  }
}

_merge(tmpState, st())

export const state = () => tmpState

export const actions = {
  copyTerm ({state, dispatch}, uid) {
    return dispatch('api/post', {url: '/owner/termcopy', data: {uid: uid}}, {root: true})
  },
  updateParagraph ({state, commit}, {value, index, language}) {
    debUpdateParagraph(state, {value, index, language, commit})
  },
  updateTitle ({state, commit}, {value, index, language}) {
    debUpdateTitle(state, {value, index, language, commit})
  },
  addTreatment ({state, commit}, paragraphIndex) {
    commit('addTreatment', paragraphIndex)
  },
  updatePrivacy ({state, dispatch}) {
    const url = `/surfer/acceptupdate`
    return dispatch('api/put', {url}, {root: true})
  },
  loadToSubscribeTerm ({state, commit, dispatch}, {termId, language}) {
    return dispatch('api/get', {url: `/owner/termtosign/${language}/${termId}`}, {root: true})
      .then(res => res.data)
  },
  loadFilter ({state, commit, dispatch}) {
    return dispatch('api/get', {url: '/owner/termfilter'}, {root: true})
      .then(res => {
        commit('setTermFilter', res.data)
      })
  }
}

_merge(actions, actionsFn(moduleName))
_merge(mutations, gm)
