<template>
  <v-container fill-height grid-list-xs fluid class="ma-0 pa-0 text-xs-center" >

    <vue-friendly-iframe  @iframe-load="onLoad" class="app-frame" allow="true" crossorigin="true" :src="ui.currentAppSrc" ></vue-friendly-iframe>
  </v-container>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    mounted () {
      this.loading = true
    },
    fetch ({store}) {
      return true
    },
    data () {
      return {
        loading: false
      }
    },
    components: {},
    computed: {
      ...mapState('app', ['ui'])
    },
    methods: {
      onLoad () {
        this.loading = false
      }
    }
  }
</script>

<style>
  .app-frame {
    width: 100%;
    height:100%;
    background-color: #d6d6d6;
  }
  .app-frame iframe {
    width: 100%;
    min-height:400px;
    height:100%;
  }
</style>
