import pathify from '../factories/pathify'
import { make } from 'vuex-pathify'

export const state = () => ({
  sidebar: false
})

export const mutations = {
  ...make.mutations(state),
  toggleSidebar (state) {
    state.sidebar = !state.sidebar
  }
}

export const getters = make.getters(state)
export const plugins = [ pathify.plugin ]
