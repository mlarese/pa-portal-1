export const state = () => ({
  userName: '',
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
  resetAll (s) {
    s.userName = ''
    s.enti = []
    s.menu = []
    s.user = {
      'logged': false,
      'descuser': '',
      'descente': '',
      'urlNow': '',
      'iduser': 0,
      'idente': 0,
      'error': ''
    }
  },
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
        if (!resp.data.logged) {
          alert('Utente o password non corretta')
          return
        }

        commit('setUser', resp.data)
        return dispatch('loadMenu')
      })
  },
  loadMenu ({dispatch, commit, state}) {
    let {iduser, idente} = state.user
    idente = state.enti[idente].id_ente

    const url = `/maingest/getusermenu`
    dispatch('api/get', {url, options: {params: {iduser, idente}}}, {root: true})
      .then(mnu => {
        let menu = []

        for (let mnuItem of mnu.data) {
          menu.push({...mnuItem})
        }
        commit('setMenu', menu)
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
      .catch(e => {
        console.log(e)
      })
  }
}

export const getters = {
  getDescente: s => {
    if (s.enti && s.enti.length > 0) return s.enti[0].descente
    return ''
  },
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
