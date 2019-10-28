import MockAdapter from 'axios-mock-adapter'
import axios from 'axios'
import terms from '../fixtures/terms.json'
import owners from '../fixtures/owners.json'
import treatments from '../fixtures/treatments.json'
import operators from '../fixtures/owners/operators.json'
import users from '../fixtures/operators/users.json'
import languagedescription from '../fixtures/languagedescription'
import lcoFirstTime from '../fixtures/lcoFirstTime'
import lastCheckOut from '../fixtures/lastCheckOut.json'
import customerCare from '../fixtures/CustomerCare.json'
import {login, user, logout} from '../fixtures/auth'

const mock = new MockAdapter(axios, {delayResponse: 300})

const success = {success: true}
mock
  .onPost('/api/auth/login').reply(() => [200, login])
  .onPost('/api/auth/logout').reply(() => [200, logout])
  .onGet('/api/auth/user').reply(() => [200, user])
  .onGet('/owner/profile').reply(() => [200, owners])
  .onGet(/\/owner\/\/profile\/\d+/).reply(({url}) => [200, owners.find(o => o.id === url.split('/owners/')[1] * 1)])
  .onGet('/owner/term').reply(() => [200, terms])
  .onGet('/owner/term/3').reply(() => [200, terms[0]])
  .onGet('/owner/operator').reply(() => [200, operators])
  .onGet(/\/owner\/operator\/\d+/).reply(({url}) => [200, operators.find(o => o.id === url.split('/owner/operator/')[1] * 1)])
  .onGet('/operator/user').reply(() => [200, users])
  .onGet(/\/operator\/user\/\d+/).reply(({url}) => [200, users.find(o => o.id === url.split('/operator/user/')[1] * 1)])
  .onGet('/customerCare').reply(() => [200, customerCare])
  .onPost(/\/customerCare\/\d+/).reply(() => [200, success])
  .onGet(/\/customerCare\/\d+/).reply(({url}) => [200, customerCare.find(o => o.id === url.split('/customerCare/')[1] * 1)])
  // language description
  .onGet('/languagedescription').reply(() => [200, languagedescription])
  .onGet('/lastCheckOut').reply(() => [200, lastCheckOut])
  .onGet('/lcoFirstTime').reply(() => [200, lcoFirstTime])
  .onPost(/\/languagedescription\/\d+/).reply(() => [200, success])
  .onPost(/\/lastCheckOut\/\d+/).reply(() => [200, success])
  .onPost(/\/lcoFirstTime\/\d+/).reply(() => [200, success])
  .onGet(/\/languagedescription\/\d+/).reply(({url}) => [200, customerCare.find(o => o.id === url.split('/languagedescription/')[1] * 1)])
  // trattamenti
  .onGet('/owner/treatment').reply(() => [200, treatments])
  .onPost(/\/owner\/treatment\/\w+/).reply(() => [200, success])
  .onGet('/owner/treatment/personali').reply(() => [200, treatments[0]])
  .onGet('/owner/treatment/promozioni').reply(() => [200, treatments[1]])
  .onGet('/owner/treatment/sensibili').reply(() => [200, treatments[2]])
  .onGet('/testerror500').reply(500)
  .onGet('/testerror403').reply(403)
  .onGet('/testtimeout').timeout()

export default 'mock'
