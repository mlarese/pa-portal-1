<template>
    <v-layout rows wrap>

        <v-toolbar dense class="mb-3 elevation-1">
            <v-toolbar-title>
                <v-icon>dashboard</v-icon>
                {{$t('Analisi dei ritorni annuali')}}
            </v-toolbar-title>
        </v-toolbar>


        <v-flex xs12>

            <bi-chart  type="column-chart" :data="returnsList"
                       :transform="true"
                       :stacked="true"
                       :sub-title="$t('Revenue')"
                       :title="$t('Ritorni x anno') "/>
        </v-flex>

        <v-flex xs12>

            <bi-chart  type="column-chart" :data="returnsList"
                       :transform="true"
                       :stacked="true"
                       :count="true"
                       :sub-title="$t('N° Ritorni')"
                       :title="$t('Ritorni') "/>
        </v-flex>


        <v-flex xs12>

            <bi-chart  type="column-chart" :data="progressivReturnsList"
                       :transform="true"
                       :stacked="true"
                       :library="libraryNoLegend"
                       :sub-title="$t('Revenue')"
                       :title="$t('Ritorni') + ' al ' + filter.year "/>
        </v-flex>

        <v-flex xs12>

            <bi-chart  type="column-chart" :data="progressivReturnsList"
                       :transform="true"
                       :stacked="true"
                       :library="libraryNoLegend"
                       :count="true"
                       :sub-title="$t('N° Ritorni')"
                       :title="$t('Ritorni') + ' al ' + filter.year "/>
        </v-flex>

    </v-layout>

</template>

<script>
  import _cloneDeep from 'lodash/cloneDeep'
  import _reverse from 'lodash/reverse'
  import {mapState} from 'vuex'
  import DimensionSelect from '../../../components/General/DimensionSelect'
  import BiChart from '../../../components/Bi/BiChart'
  import {dimYears, curYear, libraryMonth, biChannels, biPax, biGeneralLibrary as library, monthNames} from '../../../assets/bi'

  const libraryNoLegend = _cloneDeep(library)
  libraryNoLegend.legend = {enabled: false}
  libraryNoLegend.xAxis = {reversed: true}
  export default {
    data () {
      return {
        dimYears,
        monthNames: monthNames(),
        biPax,
        filter: {country: 'Italia', year: curYear, channel: 'C', pax: 'Single'},
        libraryMonth,
        libraryNoLegend,
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
      progressivReturnsList () {
        let rlist = _cloneDeep(this.onlyReturnsList)
        for (let i = 1; i < rlist.length; i++) {
          rlist[i].value += rlist[i - 1].value
          rlist[i].items += rlist[i - 1].items
        }
        return _reverse(rlist)
      },
      onlyReturnsList () {
        console.dir(this.returnsList)
        return this.returnsList.filter(o => o.serie === 'RITORNI')
      },
      ...mapState('bi/dashreturns', ['returnsList'])
    }
  }
</script>
