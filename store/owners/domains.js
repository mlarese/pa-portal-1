import {actionsFn, getters as ge} from '../../factories/store'
export {mutations, state} from '../../factories/store'
const moduleName = 'owner/domain'

export const getters = {
  ...ge
}
export const actions = {
  ...actionsFn(moduleName)
}
