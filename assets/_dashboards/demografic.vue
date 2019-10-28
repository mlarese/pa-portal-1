<template>
    <v-container grid-list-xs fluid>
        <DemograficDashBoard />
    </v-container>
</template>
<script>
  import dashdemografic from '../../../storeimp/fixtures/bi/dashdemografic_9'
  import DemograficDashBoard from '../../../components/Bi/Dashboard/DemograficDashBoard'
  export default {
    components: {DemograficDashBoard},
    props: [],
    fetch ({store}) {
      store.commit('bi/dashdemografic/setList', dashdemografic, {root: true})
    }
  }
</script>
