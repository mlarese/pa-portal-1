<template>
    <subscription :read-only="true"/>
</template>
<script>
  import Subscription from '../../components/Privacy/subscription/Subscription'

  export default {
    components: {Subscription},
    layout: 'whitepage',
    auth: false,
    fetch ({store, query}) {
      if (!query.email) return
      if (!query.ownerId) return
      if (!query.languange) return
      if (!query.domain) return
      let {email, ownerId, languange, domain} = query
      return store.dispatch('privacy/loadByEmailOwnerDomainFr', {email, ownerId, languange, domain}, {root: true})
        .then(() => {})
        .catch(() => {})
    }
  }
</script>
