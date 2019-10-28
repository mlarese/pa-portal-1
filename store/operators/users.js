import {actionsFn, state as s} from '../../factories/store'
export {mutations, getters} from '../../factories/store'
const moduleName = 'operator/user'

export const actions = {
  ...actionsFn(moduleName)
}

export const state = () => ({
  ...s(),
  type: [
    { text: 'operator' },
    { text: 'owner' }
  ]

})
