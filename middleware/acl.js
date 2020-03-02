// import axios from 'axios'
// import {user} from '../storeimp/fixtures/auth'
// import {getSchema} from '../assets/helpers'

export default async function ({route, store, redirect, app}) {
  if (!route.name) {
    return redirect('/login')
  } else if (route.name !== 'login') {
    if (!store.state.auth.user) {
      return redirect('/login')
    }
    if (!store.state.auth.user.logged) {
      return redirect('/login')
    }
  }
}
