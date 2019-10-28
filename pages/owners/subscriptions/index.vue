<template>
    <surfers-list/>
</template>

<script>
  import SurfersList from '../../../components/Owners/Surfers/SurfersList'
  export default {
    components: {
      SurfersList
    },
    fetch ({store}) {
      let {pagination} = store.state.owners.subscriptions.grid

      if (!pagination.sortBy) {
        const sortBy = 'created.date'
        const descending = true
        store.commit('owners/subscriptions/setSortBy', {sortBy, descending}, {root: true})
      }

      const useCache = store.state.owners.subscriptions.useCache
      if (!useCache) {
        store.dispatch('owners/subscriptions/load', {}, {root: true})
          .then(() => {
            store.commit('owners/subscriptions/setUseCache', true, {root: true})
          })
      }
    }
}
</script>

<style>

</style>
