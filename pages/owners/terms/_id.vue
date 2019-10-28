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
      if (!store.getters['auth/canSave']) {
        return next('/')
      }

      const id = params.id
      store.commit('terms/setEditMode', null, root)
      const prs = [
        store.dispatch('terms/load', {id}, root),
        store.dispatch(`treatments/load`, {}, root),
        store.dispatch(`domains/load`, {}, root)
      ]
      return Promise.all(prs)
    }
  }
</script>
