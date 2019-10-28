<template>
    <div class=" ma-2">
        <v-icon color="blue" large>email</v-icon>
        <span class="titl" v-text="$t('sent_email_with_page_privacy_update')"></span>
    </div>
</template>
<script>
  export default {
    auth: false,
    layout: 'whitepage',
    fetch ({store, router, query, redirect, app}) {
      const _k = query._k
      const lang = query.lang

      const url = `/surfer/sendunsubemail?_k${_k}&l=${lang}`

      store.commit('privacy/clearError', null, {root: true})
      store.dispatch('api/get', {url}, {root: true})
        .catch(() => {
          store.commit('privacy/setError', {message: 'Error sending email', type: 'email-sent-unsubscribe-link'}, {root: true})
          redirect('/surfer/error')
        })
    }
  }
</script>
