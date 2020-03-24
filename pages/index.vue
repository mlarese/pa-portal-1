<template>
  <v-container home grid-list-xs fluid class="ma-0 pa-0 text-xs-center" >

  </v-container>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    fetch ({store}) {
      return true
    },
    components: {},
    computed: {
      ...mapState('app', ['ui'])
    },
    methods: {
      onLoad () {

      }
    }
  }
</script>
