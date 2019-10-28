<template>
    <customer-care-list/>
</template>

<script>
  import CustomerCareList from '../../../components/Operators/customerCare/CustomerCareList'
  const root = {root: true}

  export default {
    components: {
      CustomerCareList
    },
    fetch ({store}) {
      store.dispatch('customerCare/load', {}, root)
    }
  }
</script>

<style>

</style>