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
    components: {Login}
  }
</script>
