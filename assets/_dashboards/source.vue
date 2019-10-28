<template>
    <v-container grid-list-xs fluid>
        <SourceDashBoard />
    </v-container>
</template>
<script>
  import dashsource from '../../../storeimp/fixtures/bi/dashsource_9'
  import SourceDashBoard from '../../../components/Bi/Dashboard/SourceDashBoard'

  export default {
    components: {
      SourceDashBoard
    },
    fetch ({store}) {
      store.commit('bi/dashsource/setList', dashsource, {root: true})
    }
  }
</script>
