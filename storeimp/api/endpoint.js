let baseURL = window.location.protocol + '//' + window.location.host + '/api'

let server = ''
if (window.location.hostname === 'localhost') {
  server = 'http://10.1.10.80:8080'
}

baseURL = `${server}/maingest/maingest`
// /maingestWeb/maingest/maingest/getentiutentelist

export const apiEndpoint = baseURL
