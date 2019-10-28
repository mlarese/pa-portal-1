<template>
    <v-container pa-0 class="operators-view">
        <v-layout row>
            <v-flex xs4 class="title my-2">ID:{{$record.id}}</v-flex>
            <v-flex xs6 class="mx-2 my-2 title">{{$record.name}} {{$record.surname}}</v-flex>
            <v-flex xs2>
                <v-btn flat small color="black">
                <v-icon>delete</v-icon>
                {{$t('Eliminate Operator')}}
                </v-btn>
            </v-flex>
        </v-layout>
        <v-layout row wrap style="border-bottom: 2px solid black">
            <v-flex xs4 class="btn-back">
                <v-btn flat small class="mx-0" to="/operators/owners">
                    <v-icon>reply</v-icon>
                    {{$t('Back')}}
                </v-btn>
            </v-flex>
        </v-layout>
        <v-layout row class="title"><span class="title">{{$t('Operators Data')}}</span>
            <v-spacer></v-spacer>
            <v-btn icon class="py-o" @click="setEditMode">
                <v-icon>create</v-icon>
            </v-btn>
        </v-layout>
        <v-layout row class="my-2">
            <v-flex xs2 sm2><span >{{$t('Name')}}</span></v-flex>
            <v-flex xs2 sm2 class="mx-4">
                {{$record.name}}
            </v-flex> <v-spacer></v-spacer>
            <v-flex xs2 sm2><span >{{$t('Surname')}}</span></v-flex>
            <v-flex xs2 sm2 class="mx-4">
                {{$record.surname}}
            </v-flex>
        </v-layout>
        <v-layout row class="my-2">
            <v-flex xs2 sm2><span >{{$t('Company')}}</span></v-flex>
            <v-flex xs2 sm2 class="mx-4">
                {{$record.company}}
            </v-flex> <v-spacer></v-spacer>
            <v-flex xs2 sm2><span >{{$t('Email')}}</span></v-flex>
            <v-flex xs2 sm2 class="mx-4">
                {{$record.email}}
            </v-flex>
        </v-layout>
        <v-layout row class="title my-2"><span class="title">{{$t('Accessibility Owners')}}</span></v-layout>
        <v-layout row class="my-2">
            <v-flex xs12><span >{{$t('Domain')}}</span>
                <v-flex xs6 class="mx-4">
                    <div v-for="item in $record.domains" :key="item.name">{{item.name}}</div>
                </v-flex> </v-flex>
            <v-flex xs12><span >{{$t('Language')}}</span>
                <v-flex xs6 class="mx-4">
                    <div>{{$record.language}}</div>
                </v-flex>
            </v-flex>
        </v-layout>
        <v-flex xs2 sm2><span >{{$t('Created')}}</span></v-flex>
        <v-flex xs2 sm2 class="mx-4">
            {{$record.created | time}}
        </v-flex>
    </v-container>
</template>

<script>
  import {mapState, mapMutations} from 'vuex'
  import format from 'date-fns/format'

  export default {
    filters: {
      time (value) {
        return format(value, 'dd/MM/yyyy HH:mm:ss')
      }
    },
    methods: {
      ...mapMutations('owners', ['setEditMode'])
    },
    computed: {
      ...mapState('owners', ['$record', 'record', 'languages'])
    }
  }
</script>

<style>

</style>
