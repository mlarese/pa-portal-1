import {mutations as m, actionsFn, state as s, getters as gg} from '../../factories/store'

export const actions = {
  ...actionsFn('owner/operator')
}

export const mutations = {
  ...m,
  addDomain (s) {
    s.$record.domains.push({name: ''})
  },
  removeDomain (s, index) {
    s.$record.domains.splice(index, 1)
  }
}

export const state = () => ({
  ...s(),
  periods: [
    { text: 'Temporary' },
    { text: 'Permanent' }
  ],
  roles: [
    {text: 'owner'},
    {text: 'incharge'},
    {text: 'incharge_rw'},
    {text: 'responsible'},
    {text: 'dpo'}
  ]
})

export const getters = {
  ...gg,
  isOwner: (s) => !!((s.$record && s.$record.role && s.$record.role === 'owner')),
  validRoles: (s) => s.roles.filter(o => o.text !== 'owner'),
  canAddDomain: (s) => (!s.$record || !s.$record.domains) ? true : s.$record.domains.filter(d => !d.name).length === 0
}
