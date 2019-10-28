// import {mapState, mapActions, mapMutations, mapGetters} from 'vuex
export const bihandler = (namespace) => {
  return {
    asyncData ({store}) {
      return store.dispatch('bi/dimensions/load', {}, {root: true})
    }
  }
}
