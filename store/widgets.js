export const state = () => ({
  terms: {},
  path: 1,
  ownerId: 0
})

export const mutations = () => ({
  setTerms (state, payload) {
    state.terms = payload
  },
  setPath (state, payload) {
    state.path = payload
  },
  setOwnerId (state, payload) {
    state.ownerId = payload
  }
})
