<template>
    <login v-if="visible"/>
</template>
<script>
  import Login from '../modules/login/Login'
  import _delay from 'lodash/delay'

  export default {
    data () {
      return {
        visible: false
      }
    },
    layout: 'empty',
    components: {Login},
    mounted () {
      if (this.$route.path === '/login') {
        _delay(() => { this.visible = true }, 300)
      }
    }
  }
</script>
