<template>
    <user-request-managements/>
</template>

<script>
  import UserRequestManagements from '../../../components/Owners/UserRequests/UserRequestManagements'

  export default {
    components: {
      UserRequestManagements
    },
    fetch ({store, params}) {
      const id = params.id
      return store.dispatch('owners/userrequests/load', {id}, {root: true})
    }
  }
</script>