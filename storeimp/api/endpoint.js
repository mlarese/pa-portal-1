let baseURL = window.location.protocol + '//' + window.location.host + '/api'

if (process.env.NODE_ENV === 'development' || window.location.hostname === 'localhost') {

}
const server = 'http://10.1.10.80:8080'
baseURL = `${server}/maingest/maingest`
// /maingestWeb/maingest/maingest/getentiutentelist

export const apiEndpoint = baseURL
