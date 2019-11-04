import axios from 'axios'
import { setupCache } from 'axios-cache-adapter'
import {apiEndpoint} from './endpoint'
import mock from './mocks'

console.log
// import mock in dev mod only

export const notifyError = (err, translate = null) => {
  let text = 'Error'
  let title = 'Error'
  let type = 'error'

  if (err.response && err.response.data && err.response.data.error_message) {
    text = err.response.data.error_message
  } else if (err.response && err.response.statusText) {
    text = err.response.statusText
  } else if (err.message) {
    text = err.message
  }

  if (translate) {
    title = translate(title)
    text = translate(text)
  }

  return {title, text, type}
}

export const notifySuccess = ({title, text}) => ({title, text, type: 'success'})

/**
let baseURL = window.location.protocol + '//' + window.location.host + '/api'

if (process.env.NODE_ENV === 'development' || window.location.hostname === 'localhost') {
  baseURL = 'http://192.168.1.86/api'
  baseURL = 'http://localhost/api'
}
*/

const baseURL = apiEndpoint
const cache = setupCache({ maxAge: 1 * 60 * 1000 })

const instance = axios.create({
  baseURL,
  adapter: cache.adapter,
  clearOnError: true,
  timeout: 9000,
  headers: {'Content-Type': 'application/json'},
  withCredentials: true
})

export const apiBaseUrl = baseURL

export const actions = {
  init ({commit}) {
    commit('error')
    commit('hasError')
  },
  get ({commit, getters}, {url, options = {}, debug = false}) {
    commit('isAjax', true)
    commit('error')
    commit('hasError')

    if (!options.headers) {
      options.headers = {}
    }

    if (debug) {
      console.log(baseURL + url, options)
    }
    return instance.get(url, options)
      .then(res => {
        commit('isAjax')
        return res
      })
      .catch(err => {
        console.dir(err)

        commit('isAjax')
        commit('error', err)
        commit('hasError', true)
        commit('notification', notifyError(err))
        return Promise.reject(err)
      })
  },
  post ({commit, getters}, {url, data, options = {}, serverName = 'abs'}) {
    commit('isAjax', true)
    commit('error')
    commit('hasError')

    cache.store.clear()
    return instance.post(url, data, options)
      .then(res => {
        commit('isAjax')
        return res
      })
      .catch(err => {
        console.log(err)
        commit('isAjax')
        commit('error', err)
        commit('hasError', true)
        commit('notification', notifyError(err))
        return Promise.reject(err)
      })
  },
  put ({commit, getters}, {url, data, options = {}}, serverName = 'abs') {
    commit('isAjax', true)
    commit('error')
    commit('hasError')
    cache.store.clear()
    return instance.put(url, data, options)
      .then(res => {
        commit('isAjax')
        return res
      })
      .catch(err => {
        console.log(err)
        commit('isAjax')
        commit('error', err)
        commit('hasError', true)
        commit('notification', notifyError(err))
        return Promise.reject(err)
      })
  },
  delete ({commit, getters}, {url, options = {}}, serverName = 'abs') {
    commit('isAjax', true)
    commit('error')
    commit('hasError')
    cache.store.clear()
    return instance.delete(url, options)
      .then(res => {
        commit('isAjax')
        return res
      })
      .catch(err => {
        console.log(err)
        commit('isAjax')
        commit('error', err)
        commit('hasError', true)
        commit('notification', notifyError(err))
        return Promise.reject(err)
      })
  }
}
