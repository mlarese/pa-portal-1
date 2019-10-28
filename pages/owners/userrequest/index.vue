<template>
    <user-request-list/>
</template>

<script>
  import UserRequestList from '../../../components/Owners/UserRequests/UserRequestList'
  const root = {root: true}

  export default {
    components: {
      UserRequestList
    },
    fetch ({store}) {
      store.dispatch('owners/userrequests/load', {}, root)
    }
  }
</script>

<style>

</style>
