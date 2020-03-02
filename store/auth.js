export const state = () => ({
  userName: null,
  menu: [],
  user: {
    'logged': false,
    'descuser': '',
    'descente': '',
    'urlNow': '',
    'iduser': 0,
    'idente': 0,
    'error': ''
  },
  enti: []
})

export const mutations = {
  setUserName (s, p) {
    s.userName = p
  },
  setUser (s, p) {
    s.user = p
  },
  setEnti (s, p) {
    s.enti = p
  },
  resetEnti (s) {
    s.enti = []
  },
  setMenu (state, payload) {
    state.menu = payload
  }
}

export const actions = {
  doLogin ({commit, state, dispatch}, {username, ente, password}) {
    const url = '/maingest/dologin'
    return dispatch('api/get', {
      options: {params: {username, ente, password}},
      url
    }, {root: true})
      .then(resp => {
        commit('setUser', resp.data)
        return dispatch('loadMenu')
      })
  },
  loadMenu ({dispatch, commit, state}) {
    const {iduser, idente} = state.user
    const url = `/maingest/getusermenu`

    dispatch('api/get', {url, options: {params: {iduser, idente}}}, {root: true})
      .then(mnu => {
        commit('setMenu', mnu.data)
      })
  },
  loadEnti ({commit, state, dispatch}, username) {
    return dispatch('api/get', {
      options: {params: {username}},
      url: `/maingest/getentiutentelist`
    }, {root: true})
      .then(resp => {
        commit('setEnti', resp.data)
      })
  }
}

export const getters = {
  isLogged: state => {
    if (!state.user) return false
    return state.user.logged
  },
  hasEnti: state => state.enti.length > 0
}

export default {
  namespaced: true,
  actions,
  getters,
  mutations,
  state
}
