<template>
    <term-form />
</template>

<script>
  import TermForm from '../../../components/Owners/Terms/TermForm'
  const root = {root: true}
  export default {
    components: {
      TermForm
    },
    fetch ({store, params, next}) {
      const id = '_empty_'
      store.commit('terms/setAddMode', null, root)

      if (!store.getters['auth/canAdd']) {
        return next('/')
      }

      const prs = [
        store.dispatch('terms/load', {id}, root),
        store.dispatch(`treatments/load`, {}, root),
        store.dispatch(`domains/load`, {}, root)
      ]
      return Promise.all(prs)
    }
  }
</script>
