<template>
    <v-container grid-list-xs fluid>
        <AgeNationDashBoard />
    </v-container>
</template>
<script>
  import AgeNationDashBoard from '../../../components/Bi/Dashboard/AgeNationDashBoard'

  export default {
    components: {AgeNationDashBoard},
    props: [],
    async fetch ({store}) {
      await store.dispatch('bi/dashagenation/loadData', {}, {root: true})
    }
  }
</script>
