export const state = () => ({
  userName: null,
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
  }
}

export const actions = {
  loadEnti ({commit, state, dispatch}, username) {
    return dispatch('api/post', {
      data: {username},
      url: `/maingestWeb/maingest/maingest/getentiutentelist`
    }, {root: true})
      .then(resp => {
        commit(resp.data)
      })
  }
}

export const getters = {
  isLogged: state => state.user.logged,
  hasEnti: state => state.enti.length > 0
}

export default {
  namespaced: true,
  actions,
  getters,
  mutations,
  state
}
