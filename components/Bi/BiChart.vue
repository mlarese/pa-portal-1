<template>
    <v-layout rows wrap>
        <v-flex xs12>
            <v-toolbar sv-if="false" dense color="white" class="elevation-2">
                <v-toolbar-title class="body-2 text-xs-center" style="width:100%">
                    <div>{{title}}</div>
                    <div v-if="subTitle" class="caption">{{subTitle}}</div>
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-menu bottom left v-if="showMenu">
                    <v-btn slot="activator"   icon >
                        <v-icon>more_vert</v-icon>
                    </v-btn>

                    <v-list>
                        <v-list-tile
                                v-for="(item, i) in items"
                                :key="i"
                                @click="onChangeType(item)"
                                v-if="item.type!='pie-chart'"
                        >
                            <v-list-tile-avatar>
                                <v-icon :class="item.class">{{item.icon}}</v-icon>
                            </v-list-tile-avatar>
                            <v-list-tile-title>
                                {{ item.title }}
                            </v-list-tile-title>
                        </v-list-tile>
                    </v-list>
                </v-menu>
            </v-toolbar>

            <v-card class="" style="min-height:200px" >
                <component

                        thousands="."
                        decimal=","
                        :stacked="stackedChart"
                        :dataset="{borderWidth: 1}"
                        :colors="colors"
                        :is="chartType"
                        :xtitle="xtitle"
                        :ytitle="ytitle"
                        :data="chartData"
                        :messages="{empty: 'No data'}"
                        :curve="false"
                        :library="library"
                />

            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
export default {
  methods: {
    map (list) {
      let baseValues = []
      let cache = {}
      let tmpCache = {}
      let tmpCache1 = {}
      let serieValues = []
      let dimensionValues = []
      let valueName = 'value'

      if (this.count) {
        valueName = 'items'
      }

      for (let i = 0; i < list.length; i++) {
        list[i].serie = this.$t(list[i].serie)
        if (!tmpCache[list[i].serie]) {
          tmpCache[list[i].serie] = true
          serieValues.push(list[i].serie)
        }
        list[i].dimension = this.$t(list[i].dimension)
        if (!tmpCache1[list[i].dimension]) {
          tmpCache1[list[i].dimension] = true
          dimensionValues.push(list[i].dimension)
        }
      }

      if (this.baseDimensionsValues.length > 0) {
        dimensionValues = this.baseDimensionsValues
      }
      tmpCache = {}
      tmpCache1 = {}

      for (let i = 0; i < serieValues.length; i++) {
        let serie = {name: serieValues[i], data: {}}
        cache[serieValues[i]] = serie

        for (let j = 0; j < dimensionValues.length; j++) {
          let dimension = dimensionValues[j]
          serie.data[dimension] = 0
        }

        baseValues.push(serie)
      }

      for (let i = 0; i < list.length; i++) {
        let rec = list[i]
        let curSerieName = rec['serie']
        let curDimName = rec['dimension']
        let serie = cache[curSerieName]
        if (serie && serie.data) serie.data[curDimName] = rec[valueName]
      }

      return baseValues
    },
    onChangeType (item) {
      this.chartType = item.type
      this.stackedChart = item.stacked
    }
  },
  data () {
    return {
      chartType: 'column-chart',
      stackedChart: false,
      items: [
        { title: 'Lineare', type: 'line-chart', icon: 'show_chart', class: '', stacked: false },
        { title: 'Area', type: 'area-chart', icon: 'network_cell', class: '', stacked: false },
        { title: 'Colonne', type: 'column-chart', icon: 'bar_chart', class: '', stacked: false },
        { title: 'Colonne sovrapposte', type: 'column-chart', icon: 'bar_chart', class: '', stacked: true },
        { title: 'Barre', type: 'bar-chart', icon: 'bar_chart', class: 'rotate-90', stacked: false },
        { title: 'Barre affiancate', type: 'bar-chart', icon: 'bar_chart', class: 'rotate-90', stacked: true },
        { title: 'Torta', type: 'pie-chart', icon: 'pie_chart', class: '', stacked: false }
      ]
    }
  },
  computed: {
    showMenu () {
      return (this.chartType !== 'pie-chart')
    },
    chartData () {
      let chartData = null
      if (this.chartType === 'pie-chart') chartData = this.pieData
      else chartData = this.data

      if (this.transform) {
        chartData = this.map(chartData)
      }

      return chartData
    }
  },
  created () {
    this.chartType = this.type
    this.stackedChart = this.stacked
  },
  props: {
    colors: {default: () => ([
      '#7cb5ec',
      '#f7a35c',
      '#90ee7e',
      '#7798BF',
      '#aaeeee',
      '#ff0066',
      '#eeaaee',
      '#55BF3B',
      '#DF5353',
      '#7798BF',
      '#aaeeee'
    ])},
    count: {default: false},
    baseDimensionsValues: {default: () => []},
    library: {default: () => {}},
    type: {default: 'column-chart'},
    transform: {default: false},
    stacked: {default: false},
    data: {default: () => []},
    pieData: {default: () => []},
    title: {type: String, default: ''},
    subTitle: {type: String, default: null},
    xtitle: {type: String, default: null},
    ytitle: {type: String, default: null}
  }
}
</script>
