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
        </v-toolbar>
        <v-flex xs12>
            <bi-chart  type="column-chart" :data="channelPaxListFiltered"
                       :transform="true"
                       :library="library"
                       :sub-title="$t('Revenue')"
                       :title="$t('Analisi origine') + ' ' + filter.year   "/>
        </v-flex>
        <v-flex xs12>
            <bi-chart  type="column-chart" :data="channelPaxListFiltered"
                       :transform="true"
                       :count="true"
                       :library="library"
                       :sub-title="$t('Prenotazioni')"
                       :title="$t('Analisi origine') + ' ' + filter.year   "
            />
        </v-flex>

        <v-flex xs12>
            <bi-chart  type="column-chart" :data="paxChannelListFiltered"
                       :transform="true"
                       :title="$t('Analisi per pax') + ' ' + filter.year  "
                       :library="library"
                       :sub-title="$t('Revenue')"
            />
        </v-flex>
        <v-flex xs12>
            <bi-chart  type="column-chart" :data="paxChannelListFiltered"
                       :transform="true"
                       :count="true"
                       :sub-title="$t('Prenotazioni')"
                       :title="$t('Analisi per pax') + ' ' + filter.year  "/>
        </v-flex>

        <v-toolbar class="mt-3">
            <v-flex xs2 class="mt-3 pa-2">
                <v-select :multiple="false"  :label="$t('Anno')"  v-model="filter.year" :items="dimYears"  />
            </v-flex>
            <v-flex xs2 class="mt-3 pa-2">
                <v-select :multiple="false"  :label="$t('Pax')"  v-model="filter.pax" :items="biPax"  >
                    <template slot="item" slot-scope="data">
                        <v-list-tile-content v-text="$t(data.item)"></v-list-tile-content>
                    </template>
                    <template slot="selection" slot-scope="data">
                        <v-list-tile-content v-text="$t(data.item)"></v-list-tile-content>
                    </template>
                </v-select>
            </v-flex>
        </v-toolbar>

        <v-flex xs12>

            <bi-chart  type="column-chart" :data="monthChannelListFiltered"
                       :transform="true"
                       :sub-title="$t('Revenue')"
                       :library="library"
                       :title="$t('Analisi origine x mese') + ' ' + filter.year  +  ' pax ' + $t(filter.pax)   "/>
        </v-flex>

        <v-flex xs12>

            <bi-chart  type="column-chart" :data="monthChannelListFiltered"
                       :transform="true"
                       :count="true"
                       :library="library"
                       :sub-title="$t('Prenotazioni')"
                       :title="$t('Analisi origine x mese') + ' ' + filter.year  +  ' pax ' + $t(filter.pax) "/>
        </v-flex>

        <v-toolbar class="mt-3">
            <v-flex xs2 class="mt-3 pa-2">
                <v-select :multiple="false"  :label="$t('Anno')"  v-model="filter.year" :items="dimYears"  />
            </v-flex>
            <v-flex xs2 class="mt-3 pa-2">
                <v-select :multiple="false"  :label="$t('Channel')"  v-model="filter.channel" :items="biChannels"  >
                    <template slot="item" slot-scope="data">
                        <v-list-tile-content v-text="$t(data.item)"></v-list-tile-content>
                    </template>
                    <template slot="selection" slot-scope="data">
                        <v-list-tile-content v-text="$t(data.item)"></v-list-tile-content>
                    </template>
                </v-select>
            </v-flex>
        </v-toolbar>

        <v-flex xs12>
            <bi-chart  type="column-chart" :data="monthPaxListFiltered"
                       :transform="true"
                       :library="library"
                       :sub-title="$t('Revenue')"
                       :title="$t('Analisi origine x mese') + ' ' + filter.year  +  ' canale ' + $t(filter.channel) "/>
        </v-flex>

        <v-flex xs12>
            <bi-chart  type="column-chart" :data="monthPaxListFiltered"
                       :transform="true"
                       :library="library"
                       :count="true"
                       :sub-title="$t('Prenotazioni')"
                       :title="$t('Analisi origine x mese') + ' ' + filter.year  +  ' canale ' + $t(filter.channel)  "/>
        </v-flex>

    </v-layout>

</template>

<script>
  import {mapState} from 'vuex'
  import DimensionSelect from '../../../components/General/DimensionSelect'
  import BiChart from '../../../components/Bi/BiChart'
  import {dimYears, monthNames, curYear, libraryMonth, biChannels, biPax, biGeneralLibrary as library} from '../../../assets/bi'
  export default {
    data () {
      return {
        dimYears,
        biPax,
        filter: {country: 'Italia', year: curYear, channel: 'C', pax: 'Single'},
        libraryMonth,
        biChannels,
        monthNames: monthNames(),
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
      channelPaxListFiltered () { return this.channelPaxList.filter(o => o.filter === this.filter.year) },
      paxChannelListFiltered () { return this.paxChannelList.filter(o => o.filter === this.filter.year) },
      monthChannelListFiltered () { return this.monthChannelList.filter(o => o.filter === this.filter.year && o.filter1 === this.filter.pax) },
      monthPaxListFiltered () { return this.monthPaxList.filter(o => o.filter === this.filter.year && o.filter1 === this.filter.channel) },
      ...mapState('bi/dashdemografic', ['channelPaxList', 'paxChannelList', 'monthChannelList', 'monthPaxList'])
    }
  }
</script>
