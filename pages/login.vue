<template>
    <login v-if="visible"/>
</template>
<script>
  import Login from '../modules/login/Login'

  export default {
    data () {
      return {
        visible: true
      }
    },
    layout: 'empty',
    components: {Login},
    fetch ({store}) {
      // store.dispatch('auth/loadMenu', null, {root: true})
      // store.dispatch('auth/loadEnti', 'davide', {root: true})
    }
  }
</script>
