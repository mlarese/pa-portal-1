import {actionsFn, getters as ge, mutations as mu, state as st} from '../../factories/store'
import _groupBy from 'lodash/groupBy'
import _sortBy from 'lodash/sortBy'
import {extractFlags} from '../../assets/helpers'
// import uuid from 'uuid/v1'

const moduleName = 'owner/termspages'

export const getters = {
  ...ge,
  pagesByDomain: s => _groupBy(_sortBy(s.list, 'domain'), 'domain'),
  optionsPages: s => {
    let res = []
    s.pagesList.forEach(o => res.push({...o, domainPage: o.domain + o.page}))
    return res
  },
  optionsDomains: s => {
    let res = []
    s.domainsList.forEach(o => res.push({...o, domain: o.name}))
    return res
  }
}
export const actions = {
  ...actionsFn(moduleName),
  saveUser ({dispatch}, {attachments, paragraphs, $record, domain, page, ownerId}) {
    let {email, name, surname, telephone, termId, language, id} = $record
    let form = {email, name, surname, telephone}
    let flags = extractFlags(paragraphs, termId)

    let data = {
      id,
      ownerId,
      domain,
      page,
      termId,
      language,
      flags,
      term: {termId, paragraphs, language, ownerId},
      form,
      ref: 'internal',
      cryptedForm: form,
      record: {email, name, surname, telephone}
    }

    const test = false

    if (test) {
      return dispatch('api/post', {url: '/user/attachment', data: attachments}, {root: true})
    }
    return dispatch('api/post', {url: '/owner/user', data}, {root: true})
      .then(() => { return dispatch('api/post', {url: '/user/attachment', data: attachments}, {root: true}) })
  },
  loadByTermId ({commit, dispatch}, termId) {
    // return dispatch('api/get', {url: `/${moduleName}/${termId}`}, {root: true})
    //  .then(res => commit('setPagesList', res.data))
    return dispatch('api/get', {url: `/owner/domain`}, {root: true})
      .then(res => commit('setDomainsList', res.data))
  }
}

export const mutations = {
  ...mu,
  setPagesList (s, p) {
    s.pagesList = p
  },
  setDomainsList (s, p) {
    s.domainsList = p
  }
}

export const state = () => ({
  ...st(),
  pagesList: [],
  domainsList: []
})
