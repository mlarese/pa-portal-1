<template>
    <v-app class="white">
        <notifications position="top right" style="margin-top:50px"/>
      <nuxt />
    </v-app>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    watch: {
      'notification.id' (val) {
        this.$notify(this.notification)
      }
    },
    computed: {
      ...mapState('app', ['title']),
      ...mapState('api', ['notification'])
    }
  }
</script>
