import _cloneDeep from 'lodash/cloneDeep'

const searchObject = () => ({criteria: '', localCriteria: '', localDateCriteria: '', needRefresh: false, toggleValue1: 0})
export const state = () => {
  return {
    inited: false,
    error: {message: '', type: ''},
    exportFilter: {},
    exportList: {},
    comboOptions: [],
    filter: {},
    applyFilter: false,
    comboSelected: null,
    loaded: false,
    list: [],
    recordList: [],
    useCache: false,
    record: {},
    $record: {},
    addRecord: {},
    form: {valid: false, dirty: false, saving: false},
    search: searchObject(),
    grid: {pagination: {}},
    mode: 'list'
  }
}

const root = {root: true}

export const actionsFn = (endPoint, options = {}) => {
  return {
    save ({dispatch, commit, state, getters}, {data, id, options = {}}) {
      if (getters.isAddMode) {
        return dispatch('insert', {data, options})
      } else {
        return dispatch('update', {data, id, options})
      }
    },
    update ({dispatch, commit, state}, {data, id, options = {}}) {
      const url = `/${endPoint}/${id}`
      return dispatch('api/put', {url, data, options}, root)
        .then(r => {
          return r
        })
    },
    insert ({dispatch, commit}, {data, options = {}}) {
      const url = `/${endPoint}`
      return dispatch('api/post', {url, data, options}, root)
        .then(r => {
          return r
        })
    },
    search ({dispatch, commit, state}) {

    },
    delete ({state, dispatch, commit, getters}, id) {
      const url = `/${endPoint}/${id}`
      return dispatch('api/delete', {url}, {root: true})
    },
    loadOptions ({dispatch, commit}, {id = null, options = {}}) {
      return dispatch('api/get', {url: `/${endPoint}_opt`, options, debug: false}, root)
        .then(res => {
          commit('setComboOptions', res.data)
          return res
        })
    },
    loadList ({dispatch, commit, state}, {listName = 'list', force = true, options = {}}) {
      if (!force && state.loaded) {
        return
      }
      return dispatch('api/get', {url: `/${endPoint}`, options, debug: false}, root)
        .then(res => {
          commit('setListParametric', {data: res.data, listName})
          return res
        })
    },
    loadby ({dispatch, commit, state}, {id, options = {}}) {
      return dispatch('api/get', {url: `/${endPoint}by/${id}`, options, debug: false}, root)
        .then(res => {
          commit('setList', res.data)
          return res
        })
    },
    saveby ({dispatch, commit, state}, {id, data = null, options = {}}) {
      if (!data) {
        data = state.list
      }
      const url = `/${endPoint}by/${id}`
      return dispatch('api/put', {url, data, options}, root)
    },
    load ({dispatch, commit, state}, {id = null, force = true, options = {}}) {
      if (id === null) {
        if (!force && state.loaded) {
          return
        }
        return dispatch('api/get', {url: `/${endPoint}`, options, debug: false}, root)
          .then(res => {
            commit('setList', res.data)
            return res
          })
      } else {
        return dispatch('api/get', {url: `/${endPoint}/${id}`, options}, root)
          .then(res => {
            commit('setRecord', res.data)
            return res
          })
      }
    },
    loadRecordList ({dispatch, commit, state}, {id = null, options = {}}) {
      const url = `/${endPoint}/${id}`
      console.log('id', id, 'url', url)
      return dispatch('api/get', {url, options}, root)
        .then(res => {
          commit('setRecordList', res.data)
          return res
        })
    }
  }
}

export const mutations = {
  setListParametric (s, {data, listName}) {
    s[listName] = data
  },
  clearError (s) { s.error = {message: '', type: ''} },
  setError (s, p) { s.error = p },
  updateStore (s, {stateAttr, value}) {
    s[stateAttr] = _cloneDeep(value)
  },
  setComboOptions (s, p) { s.comboOptions = p },
  setComboSelected (s, p) { s.comboSelected = p },
  setLoaded (s, p) { s.loaded = p },
  setFilter (s, p) { s.filter = p },
  addToFilter (s, {field, value}) { s.filter[field] = value },
  setApplyFilter (s, p) { s.applyFilter = true },
  unsetFilter (s, p) {
    s.filter = {}
    s.applyFilter = false
  },
  setInited (s, p) { s.inited = p },
  setRecordList (s, p) { s.recordList = p },
  setNeedRefresh (s, p) { s.search.needRefresh = p },
  setToggleValue1 (s, p) { s.search.toggleValue1 = p },
  setExportFilter (s, p) {
    s.exportFilter = p
  },
  setExportList (s, p) { s.exportList = p },
  setPagination (s, p) { s.pagination = p },
  setSortBy (s, {sortBy, descending}) {
    s.grid.pagination.sortBy = sortBy
    s.grid.pagination.descending = descending
  },
  setList (s, p) {
    s.list = p
    // s.search = searchObject()
    s.useCache = true
    s.loaded = true
    s.grid = {pagination: {}}
  },
  setRecord (s, p) {
    s.record = _cloneDeep(p)
    s.$record = _cloneDeep(p)
    s.loaded = true
  },
  set$Record (s, p) {
    s.$record = _cloneDeep(p)
    s.loaded = true
  },
  setAddRecord (s, p) {
    s.addRecord = p
  },
  setUseCache (s, p) { s.useCache = p },
  setMode (s, p) { s.mode = p },
  setForm (s, p) { s.form = p },
  setFormValid (s, p) { s.form.valid = p },
  setFormDirty (s, p) { s.form.dirty = p },
  setFormSaving (s, p) { s.form.saving = p },
  setListMode (s) { s.mode = 'list' },
  setViewMode (s) { s.mode = 'view' },
  setEditMode (s) { s.mode = 'edit' },
  setAddMode (s) { s.mode = 'add' },
  setSearchMode (s) { s.mode = 'search' }
}

export const getters = {
  hasFilter: state => state.filter,
  getToggleValue1: s => s.search.toggleValue1 || 0,
  isSearchMode: s => s.mode === 'search',
  isListMode: s => s.mode === 'list',
  isEditMode: s => s.mode === 'edit',
  isAddMode: s => s.mode === 'add',
  isViewMode: s => s.mode === 'view'
}
