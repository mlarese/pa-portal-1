<template>
    <v-container grid-list-xs fluid>
        <ReturnsDashBoard />
    </v-container>
</template>
<script>
  import ReturnsDashBoard from '../../../components/Bi/Dashboard/ReturnsDashBoard'

  export default {
    components: {
      ReturnsDashBoard
    },
    async fetch ({store}) {
      await store.dispatch('bi/dashreturns/loadData', {}, {root: true})
    }
  }
</script>
