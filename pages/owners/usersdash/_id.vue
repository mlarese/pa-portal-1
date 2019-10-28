<template>
    <v-container fluid class="pa-2" grid-list-sm>

        <UserForm to="/" />

    </v-container>

</template>

<script>
  // import user from '../../../storeimp/fixtures/owners/user'
  import UserForm from '../../../components/Owners/Users/UserForm'

  const module = 'owners/users'
  export default {
    components: {UserForm},
    fetch ({params, store}) {
      let id = params.id
      store.commit(module + '/setAttachments', {}, {root: false})
      return store.dispatch(module + '/loadRecordList', {id}, {root: true})
    }
  }
</script>

