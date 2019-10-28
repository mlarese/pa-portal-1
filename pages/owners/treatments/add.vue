<template>
    <treatments-managements/>
</template>

<script>
  import TreatmentsManagements from '../../../components/Owners/Treatments/TreatmentsManagements'

  const root = {root: true}
  export default {
    components: {TreatmentsManagements},
    fetch ({store, next}) {
      if (!store.getters['auth/canAdd']) {
        return next('/')
      }
      const record = {created: new Date(), creator: store.state.auth.user}
      store.commit('treatments/setRecord', record, root)
      store.commit('treatments/setAddMode', null, root)
    }
  }
</script>

<style>

</style>
