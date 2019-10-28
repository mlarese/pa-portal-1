<template>
    <users-list/>
</template>

<script>
  import UsersList from '../../../components/Operators/Users/UsersList'
  const root = {root: true}

  export default {
    components: {
      UsersList
    },
    fetch ({store}) {
      store.dispatch('operators/users/load', {}, root)
    }
  }
</script>

<style>

</style>