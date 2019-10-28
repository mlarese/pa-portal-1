import {actionsFn} from '../factories/store'
export {mutations, getters, state} from '../factories/store'
const moduleName = 'owner/config'

export const actions = {
  ...actionsFn(moduleName)
}
