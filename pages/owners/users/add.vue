<template>
    <UserAddForm />
</template>

<script>
  import {newUser} from '../../../store/owners/users'
  import UserAddForm from '../../../components/Owners/Users/UserAddForm'

  export default {
    components: {UserAddForm},
    props: [],
    fetch ({store, next}) {
      const newUserObj = newUser()
      store.commit('owners/users/setAddRecord', newUserObj, {root: true})
      store.commit('owners/users/setAttachments', {id: newUserObj.id, attachments: []}, {root: false})
      if (!store.getters['auth/canAdd']) {
        return next('/')
      }
    }
  }
</script>

<style>

</style>
