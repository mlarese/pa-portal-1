<template>
    <v-container grid-list-xs fluid>
        <AgeNationDashBoard />
    </v-container>
</template>
<script>
  import dashdemografic from '../../../storeimp/fixtures/bi/dashdemografic_9'
  import AgeNationDashBoard from '../../../components/Bi/Dashboard/AgeNationDashBoard'

  export default {
    components: {AgeNationDashBoard},
    props: [],
    fetch ({store}) {
      store.commit('bi/dashagenation/setList', dashdemografic, {root: true})
      store.commit('bi/dashagenation/setFilter', {country: 'Italia'}, {root: true})
    }
  }
</script>
