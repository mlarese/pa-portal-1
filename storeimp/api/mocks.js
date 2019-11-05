import MockAdapter from 'axios-mock-adapter'
import {instance} from './axios-instance'
import entiuser from '../fixtures/entiuser'
import userdata from '../fixtures/userdata'

const mock = new MockAdapter(instance, {delayResponse: 300})

mock
  .onGet('/maingest/getentiutentelist').reply(() => [200, entiuser])
  .onGet('/maingest/dologin').reply(() => [200, userdata])
  .onGet('/testerror500').reply(500)
  .onGet('/testerror403').reply(403)
  .onGet('/testtimeout').timeout()

export default 'mock'

console.log('Mock active')
