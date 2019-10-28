<template>
    <v-container dark fluid class="pa-0 subscription-title" grid-list-sm>
        <v-layout row wrap >
            <v-flex class="headline pt-0 mb-2" >
                <b>{{name}} {{surname}}: {{$t('Here are your subscriptions to the regulations of the site')}} {{domain}}</b>
            </v-flex>
        </v-layout>

        <v-layout mt-0 row wrap>
            <v-flex sm9 class=" pt-2 ">
                {{$t('If you wish you can modify them')}}
            </v-flex>

            <v-flex sm3 class="text-xs-right">
                <v-btn dark  small
                       @click="$emit('unsubscribe-all')"
                       class="subscription-title-revoke-all elevation-0 text-upper">{{$t('revoke all')}}
                </v-btn>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
  import {mapState} from 'vuex'
  export default {
    computed: {
      ...mapState('privacy', ['$record'])
    },
    props: {
      name: {default: ''},
      surname: {default: ''},
      domain: {default: ''}
    }
  }
</script>

<style lang="scss">
    .subscription-title {
        border-bottom: 4px solid #e1e1e1;
    }
    .subscription-title-revoke-all {
        background: #2e879d !important;
        font-size:11px;
        position: relative;
        top:-6px;
    }
</style>
