<template>
    <v-container fluid class="terms-history ma-0 pa-0">
        <v-layout row wrap>
            <v-flex xs12 class="pa-0">
                <div class="terms-history-title" >{{$t('HISTORY ACTIONS')}}</div>
            </v-flex>
        </v-layout>

        <VuePerfectScrollbar class="right-drawer-scroll-area" v-once  :settings="settings">
            <v-layout class="pt-4" row wrap >
                <v-layout row v-for="(h, i) in history" :key="i" >
                    <v-flex xs12  class="pa-0 mb-2"  >
                        <term-history :history="h" />
                        <v-divider></v-divider>
                    </v-flex>
                </v-layout>
            </v-layout>
        </VuePerfectScrollbar>
    </v-container>
</template>

<script>
  import TermHistory from './TermHistory'
  import VuePerfectScrollbar from 'vue-perfect-scrollbar'

  export default {
    components: {
      TermHistory,
      VuePerfectScrollbar
    },
    data () {
      return {
        settings: {
          suppressScrollX: true
        }
      }
    },
    props: ['history']
  }
</script>

<style lang="scss">
    .terms-history {
        // border: 1px solid lightgrey;
        .terms-history-title {
            font-size:12px !important;
            font-weight: bold;
            padding-top:6px;
            padding-bottom:6px;
        }
    }
    .right-drawer-scroll-area {
        position: relative;
        margin: auto;
        width: 100%;
        overflow-x: hidden;
        height: 260px;
        border: 1px solid silver;
    }
</style>
