<template>
  <v-app class="grey lighten-2">
    <notifications position="top right" />
    <v-content class="empty-content">
      <v-container fluid fill-height>
        <nuxt />
      </v-container>
    </v-content>
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

<style>
  .empty-content.content{
    background: url(../assets/img/conegliano_sfondo.jpg)  center center no-repeat;
    background-size: 2000px;
  }

</style>
