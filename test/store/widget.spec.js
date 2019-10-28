import {store} from './_config'
import * as api from '../../store/api'
import {expect} from 'chai'
import { describe, it } from 'mocha'
api.namespaced = true

store.registerModule('api', api)

describe('Test store api widget', () => {
  it('dispatch get /widget', async () => {
    const url = `/widget`

    const options = {
      headers: {
        OwnerId: 1,
        TermId: 3,
        Domain: 'localhost:8080',
        Page: '/booking/index.html',
        Language: 'it'
      }
    }

    let res = await store.dispatch('api/get', {url, options, debug: false}, {root: true})
    let {data} = res
    // console.log(data)

    expect(data).to.be.a('object')
    expect(data.ownerId).to.be.a('number').to.be.equal(1)

  })

})
