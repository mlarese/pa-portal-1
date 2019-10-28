<template>
    <customer-care-managements/>
</template>

<script>
  import CustomerCareManagements from '../../../components/Operators/customerCare/CustomerCareManagements'
  const root = {root: true}

  export default {
    components: {
      CustomerCareManagements
    },
    fetch ({store, params}) {
      store.commit('customerCare/setEditMode', null, root)
      const id = params.id
      return store.dispatch('customerCare/load', {id}, root)
    }
  }
</script>