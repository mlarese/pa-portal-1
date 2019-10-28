import axios from 'axios'
// import {user} from '../storeimp/fixtures/auth'
import {getSchema} from '../assets/helpers'

export default async function ({route, store, redirect, app}) {
  store.commit('app/setDrawerRight', true, {root: true})
  store.commit('app/setBurgerRight', false, {root: true})

  /* if (store.state.app.debugMode) {
    if (!store.state.auth.loggedIn) {
      store.commit('auth/setLoggedIn', true, {root: true})
      store.commit('auth/setUser', user.user, {root: true})
    }
    return
  } */

  if (route.name && route.name.includes('surfer-')) return
  if (route.name && route.name.includes('service-')) return
  if (route.name && route.name.includes('general-')) return

  let role = 'guest'
  if (route.path === '/login/') {
    window.location = app.router.options.base
    return
  }

  if (store.state.auth && store.state.auth.user && store.state.auth.user.role) {
    role = store.state.auth.user.role
  }

  try {
    await app.$auth.fetchUser()
  } catch (e) {
    app.$auth.logout()
  }
  console.log('[route] ' + route.name)

  const schema = getSchema()
  const token = app.$auth.getToken(schema)

  store.commit('app/setMenuPermissionByIndex', {index: 0, canView: store.getters['auth/hasQuery']}, {root: true})
  store.commit('app/setMenuPermissionByIndex', {index: 1, canView: store.getters['auth/hasPredictive']}, {root: true})
  store.commit('app/setMenuPermissions', {canSave: store.getters['auth/canSave']}, {root: true})

  if (token) {
    if (token !== axios.defaults.headers.common['Authorization']) {
      axios.defaults.headers.common['Authorization'] = token
    }
  } else {
    axios.defaults.headers.common['Authorization'] = ''
    delete axios.defaults.headers.common['Authorization']
  }

  if (!route.name) {
    return redirect('/login')
  } else if (route.name !== 'login') {
    if (!store.state.auth.loggedIn) {
      return redirect('/login')
    } else if (route.fullPath !== '/') {
      if (!route.name.startsWith(role)) {
        // return redirect('/')
      }
    }
  }
}
