<template>
    <div class="text-xs-center mt-2">
        <ConfirmDeferred />
    </div>
</template>
<script>
  import ConfirmDeferred from '../../components/Owners/Surfers/ConfirmDeferred'

  export default {
    layout: 'whitepage',
    components: {ConfirmDeferred},
    auth: false,
    created () {
      if (this.$route.query.lang) this.$i18n.locale = this.$route.query.lang
    },
    fetch ({store, router, query, redirect, app}) {
      const _k = query._k
      const _j = query._j
      // const lang = query.lang
      store.commit('privacy/clearError', null, {root: true})
      return store.dispatch('privacy/deferredVisited', {_k, _j}, {root: true})
        .catch(() => {
          store.commit('privacy/setError', {message: 'Error loading user data', type: 'deferred-visit'}, {root: true})
          // redirect('/surfer/error')
        })
    }
  }
</script>
