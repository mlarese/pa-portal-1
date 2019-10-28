<template>
    <treatments-list/>
</template>

<script>
  import TreatmentsList from '../../../components/Owners/Treatments/TreatmentsList'
  const root = {root: true}
  export default {
    components: {TreatmentsList},
    fetch ({store}) {
      return store.dispatch(`treatments/load`, {}, root)
    }
  }
</script>

<style>

</style>