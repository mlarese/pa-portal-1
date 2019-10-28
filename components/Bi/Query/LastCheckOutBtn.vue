<template>
    <v-layout class="text-xs-center">
        <v-flex>
            <v-tooltip top>
                <v-btn :loading="isAjax" slot="activator" small fab class="elevation-1" color="info" @click="search">
                    <v-icon>search</v-icon>
                </v-btn>
                {{$t('Esegui query')}}
            </v-tooltip>

            <v-tooltip top>
                <v-btn slot="activator"  color="warning" fab small class="elevation-1" :disabled="!valid" @click="cancel">
                    <v-icon>clear</v-icon>
                </v-btn>
                {{$t('Reset')}}
            </v-tooltip>

        </v-flex>


    </v-layout>
</template>
<script>
  import {mapMutations, mapState, mapActions} from 'vuex'
  export default {
    name: 'LastCheckOutBtn',
    computed: {
      ...mapState('bi/qrLastCheckout', ['filter']),
      ...mapState('app', ['isAjax'])
    },
    data () {
      return {
        valid: true
      }
    },
    methods: {
      ...mapMutations('bi/qrLastCheckout', ['resetFilter', 'togglePanelFilter', 'setList']),
      ...mapActions('bi/qrLastCheckout', ['loadData']),
      search () {
        // this.togglePanelFilter()
        this.setList([])
        this.loadData({})
      },
      cancel () { this.resetFilter() }
    }
  }
</script>
