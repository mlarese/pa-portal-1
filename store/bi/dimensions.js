import {actionsFn, state as s} from '../../factories/store'

export {mutations} from '../../factories/store'
const moduleName = 'bi/dimensions'

export const actions = {
  ...actionsFn(moduleName)
}
export const state = () => ({
  ...s()
})

export const getters = {
  dimensions: s => {
    if (!s.loaded) return {}
    return s.list.reduce((result, o) => {
      result[o.code] = o.data
      return result
    }, {})
  }
}
