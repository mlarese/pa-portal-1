import {mapState} from 'vuex'
import LogList from './LogList'

export const loghandler = (namespace) => {
  return {
    components: {LogList},
    computed: {
      ...mapState(namespace, ['list'])
    }
  }
}

export const loginloghandler = (namespace) => {
  return {
    async fetch ({store}) {
      await store.dispatch(namespace + '/load', {}, {root: true})
    },
    components: {LogList},
    computed: {
      ...mapState(namespace, ['list']),
    }
  }
}
