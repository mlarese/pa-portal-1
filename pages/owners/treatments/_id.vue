<template>
    <div class="row">
        <treatments-managements/>
    </div>
</template>

<script>
  import {mapState} from 'vuex'
  import TreatmentsManagements from '../../../components/Owners/Treatments/TreatmentsManagements'
  const root = {root: true}
  export default {
    components: {TreatmentsManagements},
    computed: {
      ...mapState('treatments', ['$record'])
    },
    fetch ({store, params}) {
      const id = params.id
      store.commit('treatments/setEditMode', null, root)
      return store.dispatch('treatments/load', {id}, root)
    }
  }
</script>

<style>

</style>