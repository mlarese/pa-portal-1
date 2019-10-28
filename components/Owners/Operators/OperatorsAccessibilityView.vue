<template>
    <v-container pa-0 ma-3 class="operators-accessibility-view">
        <v-layout row class="title my-2"><span class="title">{{$t('Accessibility Operator')}}</span></v-layout>
        <v-layout row class="my-2">
            <v-flex xs12><span >{{$t('Domain')}}</span>
            <v-flex xs6 class="mx-4">
                <div v-for="item in $record.domains" :key="item.name">{{item.name}}</div>
            </v-flex> </v-flex>
            <v-flex xs12><span >{{$t('Period')}}</span>
            <v-flex xs6 class="mx-4">
               {{$record.periodFrom | time}} <br>
                {{$record.periodTo | time}}
            </v-flex>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
  import {mapState} from 'vuex'
  import format from 'date-fns/format'
  export default {
    filters: {
      time (value) {
        return format(value, 'dd/MM/yyyy HH:mm:ss')
      }
    },
    computed: {
      ...mapState('owners/operators', ['$record', 'record'])
    },
    props: []
  }
</script>

<style>

</style>
