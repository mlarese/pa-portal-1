<template>
    <v-container class="operators-data-form">
        <v-layout row class="title">{{$t('Operator Data')}}</v-layout>
        <operator-data-form/>
    </v-container>
</template>

<script>
  import OperatorDataForm from './OperatorDataForm'
  import {mapState} from 'vuex'
  export default {
    computed: {
      ...mapState('owners/operators', ['list'])
    },
    components: {
      OperatorDataForm
    }
  }
</script>

<style>

</style>