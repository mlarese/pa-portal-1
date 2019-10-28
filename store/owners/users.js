import {actionsFn, mutations as mu, getters as ge, state as st} from '../../factories/store'
import {apiBaseUrl} from '../../storeimp/api/actions'
import _values from 'lodash/values'
import _cloneDeep from 'lodash/cloneDeep'
import format from 'date-fns/format'
import subDays from 'date-fns/subDays'
import uuid from 'uuid/v4'
import {getServer} from '../../assets/helpers'

export const newUser = () => {
  return {id: uuid(), paragraphs: [], domain: null}
}

export const hasNewsLettersTermsDomainObject = (recordList) => {
  let found = false

  for (let termId in recordList) {
    let curTermList = recordList[termId]
    for (let domain in curTermList) {
      let privacy = curTermList[domain]
      if (privacy.privacyFlags) {
        // console.log(privacy.privacyFlags.length)
        for (let i = 0; i < privacy.privacyFlags.length; i++) {
          let curFlag = privacy.privacyFlags[i]
          if (curFlag.code === 'newsletter' || curFlag.code === 'newsletters') {
            if (curFlag.selected) return true
          }
        }
      }
    }
  }
  return found
}

export const privacyIdFromTermsDomainObject = (recordList) => {
  let prvList = []
  for (let termId in recordList) {
    let curTermList = recordList[termId]
    for (let domain in curTermList) {
      let privacy = curTermList[domain]
      prvList.push(privacy.id)
    }
  }
  return prvList
}

const moduleName = 'owner/usersearch'

// const emptyAttachment = () => ({fileName: 'filename', description: 'description', created: new Date()})

export const state = () => ({
  ...st(),
  todayList: [],
  attachments: {attachments: []},
  $attachments: {attachments: []}
})
export const mutations = {
  ...mu,
  addAttachments (s, files) {
    if (!s.$attachments.attachments) {
      s.$attachments.attachments = []
    }
    if (!s.$attachments.attachments.find) {
      this.$attachments.attachments = []
    }

    for (let i = 0; i < files.length; i++) {
      const created = new Date()
      if (!s.$attachments.attachments.find(o => o.fileName === files[i].fileName)) {
        let newAtt = {created, fileName: files[i].fileName, description: 'Descrizione ' + files[i].fileName}
        s.$attachments.attachments.push(newAtt)
      }
    }
  },
  removeAttachment (s, p) {
    if (s.$attachments && s.$attachments.attachments) {
      s.$attachments.attachments.splice(p, 1)
    }
  },
  resetAttachments (s, p) {
    s.$attachments = _cloneDeep(s.attachments)
  },
  blankAttachments (s, id = null) {
    s.$attachments = {id, attachments: []}
    s.attachments = {id, attachments: []}
  },
  setAttachments (s, p) {
    if (!p) p = {}
    if (!p.attachments) {
      p.attachments = []
    }
    s.attachments = _cloneDeep(p)
    s.$attachments = _cloneDeep(p)
  },
  setTodayList (s, p) {
    s.todayList = p
  },
  setSearch (s, p) {
    s.search[p.path] = p.value

    if (p.path === 'criteria') {
      s.exportFilter['person'] = p.value
      s.exportFilter = _cloneDeep(s.exportFilter)
    } else if (p.path === 'localDateCriteria') {
      s.exportFilter['created'] = p.value
      s.exportFilter = _cloneDeep(s.exportFilter)
    }
  },
  setExportFilter (s, p) {
    if (p.path === 'domain') {
      s.exportFilter['domain'] = p.value
      s.exportFilter = _cloneDeep(s.exportFilter)
    } else if (p.path === 'language') {
      s.exportFilter['language'] = p.value
      s.exportFilter = _cloneDeep(s.exportFilter)
    }
  },
  setSearchToday (s) {
    s.search.localDateCriteria = format(new Date(), 'yyyy-MM-dd')
    s.exportFilter['created'] = s.search.localDateCriteria
    s.exportFilter = _cloneDeep(s.exportFilter)
  },
  setExportFilterTreatments (s, p) {
    s.exportFilter.treatments = _cloneDeep(p)
  },
  setSearchYesterday (s) {
    s.search.localDateCriteria = format(subDays(new Date(), 1), 'yyyy-MM-dd')
    s.exportFilter['created'] = s.search.localDateCriteria
    s.exportFilter = _cloneDeep(s.exportFilter)
  },
  setSearchAll (s) {
    s.search.localDateCriteria = ''
    s.exportFilter['created'] = s.search.localDateCriteria
    s.exportFilter = _cloneDeep(s.exportFilter)
  }
}

export const getters = {
  ...ge,
  hasNewsLettersTermsDomainObject: s => hasNewsLettersTermsDomainObject(s.recordList),
  getExportFilter: s => {
    let flt = _cloneDeep(s.exportFilter)
    flt.treatments = _values(flt.treatments).filter(o => o.selected)
    return flt
  },
  hasSelectedTreatment: (s, g) => g.getExportFilter.treatments.length || false,
  attachmentList: (s, g) => {
    if (s.$attachments && s.$attachments.id) {
      return s.$attachments.attachments
    }
    return []
  },
  userCanSearch: (s, g, rs, rg) => {
    if (g.hasSelectedTreatment) return true
    return (rg['auth/canSeeNoAgreementPrivacies'])
  },
  getLastSubscription: s => {
    const pages = _values(s.recordList)
    if (pages.length > 0) {
      return _values(pages[0])[0]
    } else {
      return {}
    }
  },
  filterListByDate: (s) => {
    if (s.search.localDateCriteria === '') {
      return s.list
    } else {
      if (!s.list.filter) {
        return []
      }
      return s.list.filter(o => {
        return o.created.substr(0, 10) === s.search.localDateCriteria
      })
    }
  }
}

const getEmptyFilter = () => ({filters: {treatments: [], person: '', created: ''}})

export const actions = {
  init ({state, commit}) {
    commit('setSearchToday')
    commit('setInited', true)
  },
  ...actionsFn(moduleName),
  downloadAttachment ({state, dispatch, getters}, {i, privacyUid}) {
    let att = state.$attachments.attachments[i]
    let fname = encodeURI(btoa(att.fileName))
    let server = getServer()
    window.open(`${server}/api/user/attachmentdwn/${privacyUid}/${fname}`)
  },
  uploadAttachments ({state, dispatch, getters}) {
    // diretto da componente Uploader
  },
  unsubscribeNewsletters ({state, dispatch, getters, rootState}) {
    const url = `/surfer/unsubnewsrequest`
    const _k = rootState.route.query._k
    const privacies = privacyIdFromTermsDomainObject(state.recordList)
    const data = {
      privacies,
      _k
    }
    // console.log(url, data)
    return dispatch('api/post', {url, data}, {root: true})
  },
  unsubscribeAll ({state, dispatch, getters, rootState}) {
    const url = `/surfer/unsuballrequest`
    const _k = rootState.route.query._k
    const privacies = privacyIdFromTermsDomainObject(state.recordList)
    const data = {
      privacies,
      _k
    }
    // console.log(url, data)
    return dispatch('api/post', {url, data}, {root: true})
  },
  loadPrivaciesByEncodedData ({state, dispatch, commit}, _k) {
    const url = `/surfer/privacybye?_k=${_k}`
    return dispatch('api/get', {url}, {root: true})
      .then(res => commit('setRecordList', res.data))
  },
  loadAttachments ({state, dispatch, commit}, id) {
    const url = `/user/attachment/${id}`
    commit('blankAttachments')
    return dispatch('api/get', {url}, {root: true})
      .then(res => commit('setAttachments', res.data))
  },
  searchListDelegate ({state, dispatch, getters}) {
    const filters = getters.getExportFilter
    return dispatch('searchList', {filters})
  },
  searchList ({dispatch, commit, getters}, data = {}) {
    if (!getters.userCanSearch) return Promise.resolve([])
    const url = `/owner/usersearch`
    return dispatch('api/post', {url, data}, {root: true})
      .then(res => commit('setList', res.data))
  },
  searchListToday ({dispatch, commit, getters}) {
    if (!getters.userCanSearch) return Promise.resolve([])
    const url = `/owner/usersearch`
    let data = getEmptyFilter()
    data.filters.created = format(new Date(), 'yyyy-MM-dd')
    data.filters.postFilter = false

    return dispatch('api/post', {url, data}, {root: true})
      .then(res => commit('setTodayList', res.data))
  },
  saveAllTerms ({dispatch, commit}, data) {
    if (data.length === 0) {
      return
    }
    const url = `/owner/userterms`
    return dispatch('api/post', {url, data}, {root: true})
  },
  saveLastSubsriptionUserData ({dispatch, commit, state}, {id, data}) {
    const url = `/owner/userlastdata/${id}`
    return dispatch('api/put', {url, data}, {root: true})
      .then(() => {
        const urlAt = `/user/attachment/${id}`
        const atData = state.$attachments
        return dispatch('api/put', {url: urlAt, data: atData}, {root: true})
      })
  },
  prepareExportList ({dispatch, state, getters}, params) {
    let {adapter, contactlistname, contactlistemail, contactlistreplytoemail} = params
    const url = `${apiBaseUrl}/adapters/${adapter}/direct/export`

    const filter = getters.getExportFilter
    let data = {
      contactlistname,
      contactlistemail,
      contactlistreplytoemail,
      filters: filter
    }

    return Promise.resolve({data, url})
    // return dispatch('api/post', {url, data}, {root: true})
  }
}
