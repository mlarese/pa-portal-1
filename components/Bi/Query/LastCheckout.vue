<template>
    <div class="ma-0 pa-0 bi-query-filters" >
        <v-layout wrap row class="mb-2">
            <v-flex xs12> <LastCheckOutFilter /> </v-flex>
        </v-layout>

        <v-layout wrap row class="mb-2" v-if="userHasPredictive">
            <v-flex xs12> <LastCheckOutPredictiveFilter/> </v-flex>
        </v-layout>

        <LastCheckOutBtn/>

        <v-layout wrap row class="mt-2">
            <v-toolbar class="elevation-1 mb-1" dark dense color="light-blue darken-2">
                <v-toolbar-title>{{$t('Risultati')}} gggggg</v-toolbar-title>
            </v-toolbar>
            <v-flex xs12> <LastCheckoutPvList />  </v-flex>
        </v-layout>



    </div>
</template>
<script>
  import LastCheckoutPvList from './LastCheckoutPvList'
  import LastCheckOutFilter from './LastCheckOutFilter'
  import LastCheckOutPredictiveFilter from './LastCheckOutPredictiveFilter'
  import {mapGetters, mapState} from 'vuex'
  import LastCheckOutBtn from './LastCheckOutBtn'

export default {
    components: {LastCheckOutBtn, LastCheckoutPvList, LastCheckOutFilter, LastCheckOutPredictiveFilter},
    computed: {
      ...mapState('app', ['biTitle']),
      ...mapGetters('app', ['userHasPredictive'])
    },
    props: []
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
