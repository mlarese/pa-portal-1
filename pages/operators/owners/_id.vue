<template>
    <owners-factory/>
</template>

<script>
  import {mapState} from 'vuex'
  import OwnersFactory from '../../../components/Operators/Owners/OwnersFactory'
  const module = 'owners'
  const root = {root: true}

  export default {
    computed: {
      ...mapState(module, ['$record'])
    },
    components: {OwnersFactory},
    fetch ({store, params, query}) {
      const id = params.id
      const mode = query.mode

      if (!mode) {
        store.commit('owners/setEditMode', null, root)
      } else {
        store.commit('owners/setMode', mode, root)
      }
      return store.dispatch('owners/load', {id}, root)
    }
  }
</script>

<style>

</style>
