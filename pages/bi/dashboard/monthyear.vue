<template>
    <v-container grid-list-xs fluid>
        <SourceDashBoard />
    </v-container>
</template>
<script>
  import SourceDashBoard from '../../../components/Bi/Dashboard/SourceDashBoard'

  export default {
    components: {
      SourceDashBoard
    },
    async fetch ({store}) {
      await store.dispatch('bi/dashmonthyear/loadData', {}, {root: true})
    }
  }
</script>
