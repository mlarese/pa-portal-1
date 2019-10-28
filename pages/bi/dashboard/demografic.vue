<template>
    <v-container grid-list-xs fluid>
        <DemograficDashBoard />
    </v-container>
</template>
<script>
  import DemograficDashBoard from '../../../components/Bi/Dashboard/DemograficDashBoard'
  export default {
    components: {DemograficDashBoard},
    props: [],
    async fetch ({store}) {
      await store.dispatch('bi/dashdemografic/loadData', {}, {root: true})
    }
  }
</script>
