import {apiEndpoint} from './endpoint'
import {setupCache} from 'axios-cache-adapter'
import axios from 'axios'

const baseURL = apiEndpoint
const cache = setupCache({ maxAge: 1 * 60 * 1000 })

export const instance = axios.create({
  baseURL,
  adapter: cache.adapter,
  clearOnError: true,
  timeout: 9000,
  headers: {'Content-Type': 'application/json'},
  withCredentials: true
})
