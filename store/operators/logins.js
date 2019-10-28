import {actionsFn, getters as ge} from '../../factories/store'
import {loadFilteredFactory} from '../../components/Logs/storehelpers'
export {mutations, state} from '../../factories/store'
const moduleName = 'customercare/logins'

const loadFiltered = loadFilteredFactory(moduleName)
export const getters = {
  ...ge
}
export const actions = {
  ...actionsFn(moduleName),
  loadFiltered
}
