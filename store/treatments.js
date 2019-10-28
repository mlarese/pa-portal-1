import {actionsFn, getters as ge} from '../factories/store'
export {mutations, state} from '../factories/store'

export const actions = {
  ...actionsFn('owner/treatment')
}

export const getters = {
  ...ge,
  alreadyExist: s => code => s.list.findIndex(t => t.code === code) >= 0
}
