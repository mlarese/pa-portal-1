<template>
    <subscription />

</template>
<script>
  import Subscription from '../../components/Privacy/subscription/Subscription'

  export default {
    components: {Subscription},
    layout: 'whitepage',
    auth: false,
    fetch ({store, query}) {
      if (query._k) {
        return store.dispatch('privacy/load', {id: query._k}, {root: true})
          .then(() => {})
          .catch(() => {})
      }
    }
  }
</script>
