<template>
    <v-container pa-0 ma-3 class="operators-role view">
        <v-layout row class="title my-2"><span class="title">{{$t('Role Operator')}}</span></v-layout>
        <v-layout row class="my-4">
            <v-flex xs2 sm2><span >{{$t('Role')}}</span></v-flex>
            <v-flex xs2 sm2 class="mx-4">
                {{$record.role}}
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    computed: {
      ...mapState('owners/operators', ['$record', 'record'])
    },
    props: []
  }
</script>

<style>

</style>