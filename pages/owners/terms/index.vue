<template>
    <terms-list />
</template>

<script>
  import TermsList from '../../../components/Owners/Terms/TermsList'

  const root = {root: true}

  export default {
    components: {
      TermsList
    },
    fetch ({store}) {
      const calls = [
        store.dispatch('terms/load', {}, root)
      ]
      return Promise.all(calls)
    }
  }
</script>

<style>

</style>
