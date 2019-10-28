<template>
    <v-container row class="operators-users-view">
        <v-layout row class="title"><span class="title">{{$t('Operators Data')}}</span>
        <v-spacer></v-spacer>
            <v-btn :disabled="!canSave" icon class="py-o" @click="setEditMode">
                <v-icon>create</v-icon>
            </v-btn>
        </v-layout>

        <v-layout row class="my-2">
            <v-flex xs2 sm2><span >{{$t('Name')}}</span></v-flex>
            <v-flex xs2 sm2 class="mx-4">
                {{$record.name}}
            </v-flex> <v-spacer></v-spacer>
            <v-flex xs2 sm2><span >{{$t('Address')}}</span></v-flex>
            <v-flex xs2 sm2 class="mx-4">
                {{$record.address}}
            </v-flex>
        </v-layout>
        <v-layout row class="my-2">
            <v-flex xs2 sm2><span >{{$t('Cognome')}}</span></v-flex>
            <v-flex xs2 sm2 class="mx-4">
                {{$record.surname}}
            </v-flex> <v-spacer></v-spacer>
            <v-flex xs2 sm2><span >{{$t('CAP')}}</span></v-flex>
            <v-flex xs2 sm2 class="mx-4">
                {{$record.zipcode}}
            </v-flex>
        </v-layout>
        <v-layout row class="my-2">
            <v-flex xs2 sm2><span >{{$t('E-mail')}}</span></v-flex>
            <v-flex xs2 sm2 class="mx-4">
                {{$record.email}}
            </v-flex> <v-spacer></v-spacer>
            <v-flex xs2 sm2><span >{{$t('Citta')}}</span></v-flex>
            <v-flex xs2 sm2 class="mx-4">
                {{$record.city}}
            </v-flex>
        </v-layout>
        <v-layout row class="my-2">
            <v-flex xs2 sm2>
                <span >{{$t('Password')}}</span></v-flex>
            <v-flex xs2 sm2 class="mx-4">
                <span>{{$t('**************')}}</span>
            </v-flex> <v-spacer></v-spacer>
            <v-flex xs2 sm2><span >{{$t('Telephone')}}</span></v-flex>
            <v-flex xs2 sm2 class="mx-4">
                {{$record.telephone}}
            </v-flex>
        </v-layout>
        <v-layout class="my-4"><btn-cmds
                :btnName="$t('Create New Password')"
                color="black"
                backgroundColor="grey"/>
        </v-layout>
    </v-container>
</template>

<script>
  import BtnCmds from '../../General/BtnCmds'
  import {mapState, mapMutations, mapGetters} from 'vuex'
  export default {
    components: {BtnCmds},
    methods: {
      ...mapMutations('owners/operators', ['setEditMode'])
    },
    computed: {
      ...mapState('owners/operators', ['$record', 'record']),
      ...mapGetters('auth', ['canSave'])
    }
  }
</script>

<style>

</style>
