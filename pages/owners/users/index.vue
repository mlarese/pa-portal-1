<template>
    <UserManager />
</template>

<script>
  import UserManager from '../../../components/Owners/Users/UserManager'
  export default {
    components: {
      UserManager
    },
    fetch ({store}) {
      let useCache = store.state.owners.users.useCache
      const inited = store.state.owners.users.inited

      store.dispatch('treatments/load', {}, {root: true})
      store.dispatch('terms/load', {}, {root: true})

      if (!store.state.terms.termFilter || !store.state.terms.termFilter.length) {
        useCache = false
      }
      if (useCache) {
        // return
      }

      const pr = [
        store.dispatch('terms/loadFilter', {}, {root: true})
      ]

      if (!inited) {
        pr.push(store.dispatch('owners/users/init', {}, {root: true}))
      }

      return Promise.all(pr)
        .then(() => {
          store.dispatch('owners/users/searchListDelegate', null, {root: true})
            .then(() => store.commit('owners/users/setUseCache', true, {root: true}))
        })
    }
}
</script>

<style>

</style>
