import MockAdapter from 'axios-mock-adapter'
import axios from 'axios'
import {login, user, logout} from '../fixtures/auth'
import entiuser from '../fixtures/entiuser'

const mock = new MockAdapter(axios, {delayResponse: 300})

mock
  .onPost('/maingest/getentiutentelist').reply(() => [200, entiuser])
  .onPost('/api/auth/login').reply(() => [200, login])
  .onPost('/api/auth/logout').reply(() => [200, logout])
  .onGet('/api/auth/user').reply(() => [200, user])

  .onGet('/testerror500').reply(500)
  .onGet('/testerror403').reply(403)
  .onGet('/testtimeout').timeout()

export default 'mock'
