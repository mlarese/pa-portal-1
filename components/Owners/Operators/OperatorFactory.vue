<template>
    <v-layout pa-0 class="operator-factory">
        <component :is="currentComponent"></component>
    </v-layout>
</template>

<script>
  import OperatorsManagements from './OperatorsManagements'
  import OperatorsView from './OperatorsView'
  import {mapState} from 'vuex'
  export default {
    components: {OperatorsManagements, OperatorsView},
    computed: {
      ...mapState('owners/operators', ['mode']),
      currentComponent () {
        if (this.mode === 'edit') {
          return OperatorsManagements
        } else {
          return OperatorsView
        }
      }
    }
  }
</script>

<style>

</style>