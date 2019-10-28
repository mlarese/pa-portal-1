<template>
    <users-managements/>
</template>

<script>
  import UsersManagements from '../../../components/Operators/Users/UsersManagements'
  export default {
    components: {
      UsersManagements
    },
    fetch ({store, params}) {
      const id = params.id
      return store.dispatch('operators/users/load', {id}, {root: true})
    }
  }
</script>rm