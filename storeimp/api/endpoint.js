let baseURL = window.location.protocol + '//' + window.location.host + '/api'

if (process.env.NODE_ENV === 'development' || window.location.hostname === 'localhost') {
  baseURL = 'http://192.168.1.86/api'
  baseURL = 'http://localhost/api'
}

export const apiEndpoint = baseURL
