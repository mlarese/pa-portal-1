<template>
    <v-layout rows wrap>

        <v-toolbar dense class="mb-3 elevation-1">
            <v-toolbar-title>
                <v-icon>dashboard</v-icon>
                {{$t('Analisi mese su annualità')}}
            </v-toolbar-title>
        </v-toolbar>

        <v-toolbar>
            <v-flex xs2 class="mt-3 pa-2">
                <v-select :multiple="false"  :label="$t('Anno')"  v-model="filter.year" :items="dimYears"  />
            </v-flex>
        </v-toolbar>




        <v-flex xs12>

            <bi-chart  type="line-chart" :data="monthChannelListFiltered"
                       :transform="true"
                       :sub-title="$t('Revenue')"
                       :library="library"
                       :base-dimensions-values="monthNames"
                       :title="$t('Analisi origine x mese') + ' ' + filter.year     "/>
        </v-flex>

        <v-flex xs12>

            <bi-chart  type="line-chart" :data="monthChannelListFiltered"
                       :transform="true"
                       :count="true"
                       :library="library"
                       :base-dimensions-values="monthNames"
                       :sub-title="$t('Prenotazioni')"
                       :title="$t('Analisi origine x mese') + ' ' + filter.year  "/>
        </v-flex>

    </v-layout>

</template>

<script>
  import {mapState} from 'vuex'
  import DimensionSelect from '../../../components/General/DimensionSelect'
  import BiChart from '../../../components/Bi/BiChart'
  import {dimYears, curYear, libraryMonth, biChannels, biPax, biGeneralLibrary as library, monthNames} from '../../../assets/bi'
  export default {
    data () {
      return {
        dimYears,
        monthNames: monthNames(),
        biPax,
        filter: {country: 'Italia', year: curYear, channel: 'C', pax: 'Single'},
        libraryMonth,
        biChannels,
        library,
        libraryPie: {
          chart: {
            type: 'pie', options3d: {enabled: true, alpha: 45, beta: 0}
          },
          plotOptions: {
            pie: {
              allowPointSelect: true,
              showInLegend: false,
              cursor: 'pointer',
              depth: 35,
              dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: {point.percentage:.1f} %'
              }
            }
          }
        }
      }
    },
    components: {DimensionSelect, BiChart},
    computed: {
      monthChannelListFiltered () { return this.monthChannelList.filter(o => o.filter === this.filter.year) },
      ...mapState('bi/dashmonthyear', ['monthChannelList'])
    }
  }
</script>
