import format from 'date-fns/format'
import {mutations as m, actionsFn, state as s, getters as g} from '../factories/store'
const moduleName = 'surfer/privacy'

export const actions = {
  init ({state, commit}, {language}) {
    commit('setLanguage', language)
  },
  deferredVisited ({dispatch, commit}, data) {
    const url = `/surfer/dbloptvis`
    return dispatch('api/put', {url, data}, {root: true})
      .then((res) => {
        const p = res.data
        let defrecord = {}
        let pageObj = {}
        let termidObj = p
        pageObj[p.termId] = termidObj
        defrecord[p.page] = pageObj
        commit('owners/users/setRecordList', defrecord, {root: true})
      })
  },
  ...actionsFn(moduleName),
  loadByEmailOwnerDomainFr ({commit, dispatch}, {email, ownerId, languange, domain}) {
    const url = `/surfer/privacybyeodfr?email=${email}&ownerId=${ownerId}&languange=${languange}&domain=${domain}`
    return dispatch('api/get', {url}, {root: true})
      .then(res => commit('owners/users/setRecordList', res.data, {root: true}))
  },
  loadByEmailOwnerDomain ({commit, dispatch}, _k) {
    const url = `/surfer/privacybyeod?_k=${_k}`
    return dispatch('api/get', {url}, {root: true})
      .then(res => commit('owners/users/setRecordList', res.data, {root: true}))
  }
}

export const mutations = {
  ...m,
  setLanguage (s, p) {
    s.language = p
  },
  setOwnerId (s, p) {
    s.ownerId = p
  },
  setPrivacyQs (s, p) {
    s.privacyQs = p
  }
}

export const state = () => ({
  ...s(),
  ownerId: 0,
  language: 'it',
  privacyQs: null
})

export const getters = {
  ...g,
  flatPrivacy: (s, g) => pr => {
    let r = {
      columns: ['date', 'time'],
      values: []
    }

    for (let j = 0; j < pr.length; j++) {
      let p = pr[j]
      let values = [
        format(p.created, 'DD/MM/yyyy'),
        format(p.created, 'HH:mm:ss')
      ]

      for (let i = 0; i < p.flags.length; i++) {
        let f = p.flags[i]
        if (j === 0) {
          r.columns.push(f.name)
        }
        values.push(f.value)
      }

      if (j === 0) {
        r.columns.push('Agreement url')
        r.columns.push('Ip address')
      }
      values.push(p.url)
      values.push(p.ip)

      r.values.push(values)
    }

    return r
  }
}
