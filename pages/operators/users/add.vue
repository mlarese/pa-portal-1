<template>
    <users-managements/>
</template>

<script>
  import UsersManagements from '../../../components/Operators/Users/UsersManagements'
  export default {
    components: {
      UsersManagements
    },
    fetch ({store}) {
      store.commit('operators/users/setAddRecord', {}, {root: true})
    }
  }
</script>

<style>

</style>
