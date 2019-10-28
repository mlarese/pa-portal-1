<template>
    <div>{{upgPrivacy}}</div>
</template>

<script>
    export default {
      name: 'upgprivacy',
      auth: false,
      fetch ({store}) {
        store.dispatch('terms/loadUpgrade', {}, {root: true})
      }
    }
</script>

<style scoped>

</style>
