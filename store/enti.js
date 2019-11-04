import {mutations as m, actionsFn, state as s, getters as gg} from '../factories/store'

export const actions = {
  ...actionsFn('maingest/getentiutentelist')
}

export const mutations = {
  ...m
}

export const state = () => ({
  ...s()
})

export const getters = {
  ...gg
}
