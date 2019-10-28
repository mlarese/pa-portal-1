import {store} from './_config'
import * as api from '../../store/api'
import * as auth from '../../store/auth'
import {expect} from 'chai'
import { describe, it } from 'mocha'
api.namespaced = true

store.registerModule('api', api)
store.registerModule('auth', auth)

describe('Test store api auth', () => {
  it('dispatch /api/auth/login', async () => {
    let res = await store.dispatch('api/post', {url: '/auth/login'}, {root: true})
    let {data} = res
    console.log('--- login ---', data)

    expect(data).to.be.a('object')
    expect(data.token).to.be.a('string').to.be.equal('ssddddssd')
  })

  it('dispatch /api/auth/user', async () => {
    let res = await store.dispatch('api/get', {url: '/auth/user'}, {root: true})
    let {user} = res.data
    console.log('--- user ---', user)

    expect(user).to.exist.to.be.a('object')
    expect(user.user).to.exist.to.be.equal('mauro.larese')
    expect(user.userName).to.exist.to.be.equal('Larese Moro Mauro')
  })
})
