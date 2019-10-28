<template>
    <OperatorFactory />
</template>

<script>
  import OperatorFactory from '../../../components/Owners/Operators/OperatorFactory.vue'
  import {mapState} from 'vuex'
  const root = {root: true}

  export default {
    components: {OperatorFactory},
    computed: {
      ...mapState('owners/operators', ['$record'])
    },
    fetch ({store, params, query, next}) {
      if (!store.getters['auth/canManageOperators']) {
        return next('/')
      }
      const id = params.id
      const mode = query.mode

      store.commit('owners/operators/setMode', mode, root)

      const all = [
        store.dispatch('terms/load', {}, root),
        store.dispatch('treatments/load', {}, root),
        store.dispatch('owners/operators/load', {id}, root)
      ]

      return Promise.all(all)
    }
  }
</script>

<style>

</style>
