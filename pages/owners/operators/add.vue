<template>
    <operators-managements/>
</template>

<script>
  import OperatorsManagements from '../../../components/Owners/Operators/OperatorsManagements'
  export default {
    components: {
      OperatorsManagements
    },
    fetch ({store, next}) {
      if (!store.getters['auth/canManageOperators']) {
        return next('/')
      }
      const record = {domains: [], periodFrom: new Date(), created: new Date(), user: '', password: '', role: 'incharge'}
      store.commit('owners/operators/setRecord', record, {root: true})
      store.commit('owners/operators/setAddMode', null, {root: true})
    }
  }
</script>

<style>

</style>
