import {locale} from '../assets/helpers'

export const state = () => ({
  locale: locale,
  title: 'Gestione Ente Pubblico',
  version: '1.1.3',
  debugMode: false,
  ui: {
    currentAppSrc: '',
    drawerLeft: true,
    drawerRight: false,
    burgerRight: false
  }

})

export const mutations = {
  setDrawerLeft (state, payload) { state.ui.drawerLeft = payload },
  setDrawerRight (state, payload) { state.ui.drawerRight = payload },
  setBurgerRight (state, payload) {
    state.ui.burgerRight = payload
  },
  setTitle (state, payload) {
    state.title = payload
  }
}

export const actions = {

}

export const getters = {}
