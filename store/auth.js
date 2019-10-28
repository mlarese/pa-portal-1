export const state = () => ({
  user: {
    user: null,
    userName: null,
    role: 'guest'
  },
  loggedIn: false
})

export const mutations = {
  setLoggedIn (s, p) {
    s.loggedIn = p
  },
  setUser (s, p) {
    s.user = p
  }
}

export const actions = {
  passwordReset ({commit, state, dispatch}, user) {
    return dispatch('api/get', {url: `/auth/pwdres/${user}`}, {root: true})
  }
}

export const getters = {
  canSeeNoAgreementPrivacies: (state) => (state.user && state.user.acl && state.user.acl['can-see-no-agreement']),
  canSave: (state) => (state.user && state.user.acl && state.user.acl['can-save']),
  canAdd: (state) => (state.user && state.user.acl && state.user.acl['can-add']),
  canShare: (state) => (state.user && state.user.acl && state.user.acl['can-share']),
  canSeeAllUserData: (state) => (state.user && state.user.acl && state.user.acl['can-see-all-user-data']),
  canAddUser: (state) => (state.user && state.user.acl && state.user.acl['can-add-user']),
  canExportUserData: (state) => (state.user && state.user.acl && state.user.acl['can-export-user-data']),
  canSaveUserData: (state) => (state.user && state.user.acl && state.user.acl['can-save-user-data']),
  canSaveUserFlags: (state) => (state.user && state.user.acl && state.user.acl['can-save-user-flags']),
  canSeeUserAttachments: (state) => (state.user && state.user.acl && state.user.acl['can-see-user-attachments']),
  canManageOperators: (state) => (state.user && state.user.acl && state.user.acl['can-manage-operators']),
  hasBi: (state) => (state.user && state.user.options && state.user.options.hasBi),
  hasPredictive: (state) => (state.user && state.user.options && state.user.options.hasPredictive),
  hasQuery: (state) => (state.user && state.user.options && state.user.options.hasQuery),
  aclByRole: () => role => ({
    canSeeNoAgreement: (role !== 'incharge' && role !== 'incharge_rw'),
    canSave: (role !== 'incharge'),
    canAdd: (role !== 'incharge'),
    canAddUser: (role !== 'incharge'),
    canShare: (role !== 'incharge'),
    canExportUserData: (role === 'responsible'),
    canSeeAllUserData: (role !== 'incharge' && role !== 'incharge_rw'),
    canSaveUserData: (role !== 'incharge'),
    canSaveUserFlags: (role !== 'incharge'),
    canSeeUserAttachments: (role !== 'incharge' && role !== 'incharge_rw'),
    canDo: true,
    canManageOperators: (role !== 'incharge')
  })
}

export default {
  namespaced: true,
  actions,
  getters,
  mutations,
  state
}
