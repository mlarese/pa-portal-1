<template>
    <v-layout pa-0 class="owners-factory">
        <component :is="currentComponent"></component>
    </v-layout>
</template>

<script>
  import OwnersManagements from './OwnersManagements'
  import OwnersView from './OwnersView'
  import {mapState} from 'vuex'
  export default {
    components: {OwnersManagements, OwnersView},
    computed: {
      ...mapState('owners', ['mode']),
      currentComponent () {
        if (this.mode === 'edit') {
          return OwnersManagements
        } else {
          return OwnersView
        }
      }
    }
  }
</script>

<style>

</style>