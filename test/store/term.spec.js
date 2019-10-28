import {store} from './_config'
import * as module from '../../store/terms'
import * as api from '../../store/api'
import {expect} from 'chai'
import { describe, it } from 'mocha'

api.namespaced = true
module.namespaced = true

store.registerModule('api', api)
store.registerModule('terms', module)

describe('Test store api term', () => {
  it('dispatch get /owner/term', async () => {
    const url = `/owner/term`

    const options = {
      headers: {
        OwnerId: 1,
      }
    }

    let res = await store.dispatch('terms/load', {options}, {root: true})
    let {data} = res

    expect(data).to.be.a('array')
    expect(data).to.have.length(1)

    const uid = data[0].uid
    console.log('terms', data, uid)
    expect(uid).to.be.a('string').to.be.equal('3')

  })

  it('dispatch get /owner/term/3', async () => {
    const url = `/owner/term`

    const options = {
      headers: {
        OwnerId: 1,
        TermId: 3
      }
    }

    let res = await store.dispatch('terms/load', {options}, {root: true})
    let {data} = res

    console.log('term', data)

  })

})
