<template>
    <owners-list/>
</template>

<script>
  import OwnersList from '../../../components/Operators/Owners/OwnersList'
  const root = {root: true}

  export default {
    components: {
      OwnersList
    },
    fetch ({store}) {
      store.dispatch('owners/load', {}, root)
    }
  }
</script>

<style>

</style>
