<template>
    <div class="ma-0 pa-0 bi-query-filters" >
        <v-layout wrap row class="mb-2" v-if="userHasPredictive">
            <v-flex xs12> <LastCheckOutPredictiveFilter/> </v-flex>
        </v-layout>

        <LastCheckOutBtn/>

        <v-layout wrap row class="mt-2">
            <v-toolbar class="elevation-1 mb-1" dark dense color="light-blue darken-2">
                <v-toolbar-title>{{$t('Risultati')}}</v-toolbar-title>
            </v-toolbar>
            <v-flex xs12> <LastCheckoutList />  </v-flex>
        </v-layout>



    </div>
</template>

<script>
  import LastCheckoutList from '../../../components/Bi/Query/LastCheckoutList'
  import LastCheckOutBtn from '../../../components/Bi/Query/LastCheckOutBtn'
  import LastCheckOutPredictiveFilter from '../../../components/Bi/Query/LastCheckOutPredictiveFilter'
  import {mapState, mapActions, mapGetters} from 'vuex'

  export default {
    name: 'predict',
    async fetch ({store}) {
      store.dispatch('treatments/load', {}, {root: true})
      store.dispatch('terms/load', {}, {root: true})

      store.commit('bi/qrLastCheckout/resetFilter')
      let all = [
        // await store.dispatch('bi/qrLastCheckout/loadData', {}, {root: true}),
        await store.dispatch('terms/loadFilter', {}, {root: true}),
        await store.dispatch('bi/qrLastCheckout/loadFilterOptions', {}, {root: true})
      ]

      return Promise.all(all)
    },
    methods: {
      ...mapActions('bi/qrLastCheckout', ['loadData'])
    },
    computed: {
      ...mapState('bi/qrLastCheckout', ['list']),
      ...mapState('app', ['biTitle']),
      ...mapGetters('app', ['userHasPredictive'])
    },
    components: {
      LastCheckoutList, LastCheckOutPredictiveFilter, LastCheckOutBtn
    }
  }
</script>

<style lang="scss">
    .bi-query-filters {
        .list__tile {
            font-size: 12px;
            height: 22px;
        }
    }
    .input-group--selection-controls {
        min-width: 0px;
    }
    .chip.chip--select-multi {
        height: 18px !important;
        font-size:11px !important;
    }
</style>
