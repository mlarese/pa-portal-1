<template>
    <v-container pa-0>
        <history-operators-list/>
        <role-operator/>
        <users-informative/>
        <owners-view/>
    </v-container>
</template>

<script>
  import UsersInformative from '../../components/Owners/Users/UsersInformative'
  import OwnersForm from '../../components/Operators/Owners/OwnersForm'
  import owners from '../../storeimp/fixtures/owners.json'
  import OwnersView from '../../components/Operators/Owners/OwnersView'
  export default {
    components: {
      UsersInformative,
      OwnersForm,
      OwnersView
    },
    props: [],
    fetch ({store}) {
      return store.commit('owners/setRecord', owners[0], {root: true})
    }
  }
</script>

<style>

</style>