export const loadFilteredFactory = (moduleName) => ({commit, dispatch, rootState}) => {
  const url = `${moduleName}`
  const data = rootState.app.logFilter
  return dispatch('api/post', {url, data}, {root: true})
    .then(res => commit('setList', res.data))
}
