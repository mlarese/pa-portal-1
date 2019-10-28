<template>
    <div>
            errors
    </div>
</template>
<script>
  export default {
    fetch ({store}) {
      store.dispatch('api/get', {url: '/testerror403'}, {root: true})
    }
  }
</script>