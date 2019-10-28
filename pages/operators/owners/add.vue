<template>
    <owners-managements/>
</template>

<script>
  import OwnersManagements from '../../../components/Operators/Owners/OwnersManagements'
  const root = {root: true}

  export default {
    components: {
      OwnersManagements
    },
    fetch ({store}) {
      const record = {
        domains: [],
        created: new Date(),
        language: 'it',
        active: 'true',
        name: '',
        surname: '',
        user: '',
        password: ''
      }

      store.commit('owners/setAddMode', null, root)
      store.commit('owners/setRecord', record, root)
    }
  }
</script>

<style>

</style>
