<template>
    <operator-lists/>
</template>

<script>
  import OperatorLists from '../../../components/Owners/Operators/OperatorLists'
  export default {
    components: {OperatorLists},
    fetch ({store, next}) {
      if (!store.getters['auth/canManageOperators']) {
        return next('/')
      }
      return store.dispatch('owners/operators/load', {}, {root: true})
    }
  }
</script>

<style>

</style>
