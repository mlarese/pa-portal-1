import {actionsFn} from '../factories/store'
export {mutations, getters, state} from '../factories/store'
const moduleName = 'customercare/operator'

export const actions = {
  ...actionsFn(moduleName)
}
