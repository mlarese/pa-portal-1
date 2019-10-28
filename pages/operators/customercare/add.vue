<template>
    <customer-care-managements/>
</template>

<script>
  import CustomerCareManagements from '../../../components/Operators/customerCare/CustomerCareManagements.vue'
  const root = {root: true}
  export default {
    components: {
      CustomerCareManagements
    },
    fetch ({store}) {
      const record = {
        user: '',
        password: ''
      }

      store.commit('customerCare/setAddMode', null, root)
      store.commit('customerCare/setRecord', record, root)
    }
  }
</script>

<style>

</style>