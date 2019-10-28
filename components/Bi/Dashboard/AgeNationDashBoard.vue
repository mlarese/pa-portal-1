<template>
    <v-layout rows wrap>

        <v-toolbar dense class="mb-3 elevation-1">
            <v-toolbar-title>
                <v-icon>dashboard</v-icon>
                {{$t('Analisi demografica')}}
            </v-toolbar-title>
        </v-toolbar>

        <v-toolbar>
            <v-flex xs2 class="mt-3 pa-2">
                <v-select :multiple="false"  :label="$t('Anno')"  v-model="filter.year" :items="dimYears"  />
            </v-flex>

            <v-flex xs2 class="mt-3 pa-2">
                <v-select
                        :multiple="false"
                        item-value="country"
                        item-text="country"
                        :label="$t('Nazione')"
                        v-model="filter.country"
                        :items="countriesList"  />
            </v-flex>

        </v-toolbar>

        <v-flex xs12>
            <bi-chart  type="column-chart" :data="paxChannelListFiltered"
                       :transform="true"
                       :sub-title="$t('Revenue')"
                       :library="library"
                       :title="$t('Analisi per origine') + ' ' + filter.year + ' ' + filter.country  "/>
        </v-flex>
        <v-flex xs12>
            <bi-chart  type="column-chart" :data="paxChannelListFiltered"
                       :transform="true"
                       :sub-title="$t('Prenotazioni')"
                       :library="library"
                       :count="true"
                       :title="$t('Analisi per origine') + ' ' + filter.year + ' ' + filter.country  "/>
        </v-flex>


        <v-flex xs12>

            <bi-chart  type="pie-chart"
                       :pieData="paxChannelListFilteredPieRevenue"
                       :count="true"
                       :library="libraryPie"
                       :sub-title="$t('Revenue')"
                       :title="$t('Analisi per origine') + ' ' + filter.year + ' ' + filter.country "/>

            <bi-chart  type="pie-chart"
                       :pieData="paxChannelListFilteredPieReservations"
                       :count="true"
                       :library="libraryPie"
                       :sub-title="$t('Prenotazioni')"
                       :title="$t('Analisi per origine') + ' ' + filter.year + ' ' + filter.country "/>

        </v-flex>




        <v-flex xs12>
            <bi-chart  type="column-chart" :data="channelPaxListFiltered"
                       :transform="true"
                       :sub-title="$t('Revenue')"
                       :library="library"
                       :title="$t('Analisi per pax') + ' ' + filter.year + ' ' + filter.country  "/>
        </v-flex>

        <v-flex xs12>
            <bi-chart  type="column-chart" :data="channelPaxListFiltered"
                       :transform="true"
                       :count="true"
                       :library="library"
                       :sub-title="$t('Prenotazioni')"
                       :title="$t('Analisi per pax') + ' ' + filter.year + ' ' + filter.country  "/>
        </v-flex>

        <v-flex xs12>

            <bi-chart  type="pie-chart"
                       :pieData="channelPaxListFilteredPieRevenue"
                       :count="true"
                       :library="libraryPie"
                       :sub-title="$t('Revenue')"
                       :title="$t('Analisi per pax') + ' ' + filter.year + ' ' + filter.country "/>

            <bi-chart  type="pie-chart"
                       :pieData="channelPaxListFilteredPieReservations"
                       :count="true"
                       :library="libraryPie"
                       :sub-title="$t('Prenotazioni')"
                       :title="$t('Analisi per pax') + ' ' + filter.year + ' ' + filter.country "/>

        </v-flex>


    </v-layout>

</template>

<script>
  import {mapState} from 'vuex'
  import DimensionSelect from '../../../components/General/DimensionSelect'
  import BiChart from '../../../components/Bi/BiChart'
  import {mapPie, dimYears, curYear, libraryMonth, biChannels, biPax, biGeneralLibrary as library} from '../../../assets/bi'
  export default {
    data () {
      return {
        dimYears,
        biPax,
        filter: {country: 'Italia', year: curYear},
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
      paxChannelListFiltered () { return this.paxChannelList.filter(o => (o.filter2 === this.filter.country) && (o.filter === this.filter.year)) },
      paxChannelListFilteredPieReservations () { return mapPie(this.paxChannelListFiltered, 'serie', 'items') },
      paxChannelListFilteredPieRevenue () { return mapPie(this.paxChannelListFiltered, 'serie', 'value') },
      channelPaxListFilteredPieReservations () { return mapPie(this.channelPaxListFiltered, 'serie', 'items') },
      channelPaxListFilteredPieRevenue () { return mapPie(this.channelPaxListFiltered, 'serie', 'value') },
      channelPaxListFiltered () { return this.channelPaxList.filter(o => (o.filter2 === this.filter.country) && (o.filter === this.filter.year)) },
      ...mapState('bi/dashagenation', ['countriesList', 'channelPaxList', 'paxChannelList'])
    }
  }
</script>
