import {actionsFn} from '../../factories/store'
export {mutations, getters, state} from '../../factories/store'
const moduleName = 'owner/privacy'

export const actions = {
  ...actionsFn(moduleName)
}
