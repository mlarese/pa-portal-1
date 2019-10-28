<template>
    <v-container fluid grid-list-sm v-if="filter" class="pa-0 ma-0 bi-query-filters">
        <SaveBiResultDialog
                :show="showSaveDialog"
                @on-close="showSaveDialog=false"
                @on-cancel="showSaveDialog=false"
        />

        <BiLoadResultDialog
                :show="showOpenDialog"
                @on-close="showOpenDialog=false"
                @on-cancel="showOpenDialog=false"
        ></BiLoadResultDialog>

        <v-toolbar class="elevation-1 mb-1" dark dense color="light-blue darken-2">
            <v-toolbar-title>
                {{$t('Modelli Predittivi')}}
            </v-toolbar-title>

            <v-spacer></v-spacer>

            <v-tooltip top>
                <v-btn slot="activator" fab :disabled="!hasQuery" @click="openSaveDialog" small class="elevation-1" color="success" >
                    <v-icon>save</v-icon>
                </v-btn>
                {{$t('Salva query')}}
            </v-tooltip>
            <v-tooltip top>
                <v-btn slot="activator" @click="openOpenDialog" fab small class="elevation-1" color="info" >
                    <v-icon>cloud_download</v-icon>
                </v-btn>
                {{$t('Carica query salvata')}}
            </v-tooltip>

            <v-btn @click="panelFilter.predictiveFltPanelOpen=!panelFilter.predictiveFltPanelOpen" flat fab small class="mt-1">
                <v-icon v-if="!panelFilter.predictiveFltPanelOpen">keyboard_arrow_down</v-icon>
                <v-icon v-else>keyboard_arrow_up</v-icon>
            </v-btn>

        </v-toolbar>

        <v-card class="pa-2 elevation-1" v-if="panelFilter.predictiveFltPanelOpen">

            <v-layout wrap align-center class="pa-0">
                <v-flex xs12 sm6>

                        <v-select
                                hide-details
                                v-model="filter.leadtime"
                                :items="leadtimeOptions"
                                item-value="value"
                                item-text="label"
                                attach
                                chips
                                :label="$t('Lead time')"
                                multiple
                        ></v-select>

                </v-flex>

                <v-flex xs12 sm6>

                    <v-select
                            hide-details
                            v-model="filter.channel"
                            :items="items"
                            attach
                            chips
                            :label="$t('Channel')"
                            multiple
                    ></v-select>

                </v-flex>
            </v-layout>


            <v-layout wrap align-center class="pa-0">
                <v-flex xs12 sm6>
                    <v-toolbar   class="elevation-0 extradense">
                        <v-toolbar-title class="subheader">{{$t('Check-in')}}</v-toolbar-title>
                    </v-toolbar>
                    <el-date-picker format="dd/MM/yyyy" class="mr-1" :placeholder="$t('From')" v-model="filter.checkin_from" type="date" style />
                    <el-date-picker format="dd/MM/yyyy" :placeholder="$t('To')" v-model="filter.checkin_to" type="date" style />
                </v-flex>


                <v-flex xs12 sm6>
                    <v-toolbar   class="elevation-0 extradense">
                        <v-toolbar-title class="subheader">{{$t('Check-out')}}</v-toolbar-title>
                    </v-toolbar>
                    <el-date-picker format="dd/MM/yyyy" class="mr-1" :placeholder="$t('From')" v-model="filter.checkout_from" type="date" style />
                    <el-date-picker format="dd/MM/yyyy" :placeholder="$t('To')" v-model="filter.checkout_to" type="date" style />
                </v-flex>
            </v-layout>



            <v-layout wrap align-center class="pa-0">
                <v-flex xs4 sm2>
                    <v-select
                            hide-details
                            v-model="filter.time_range_type"
                            :items="timeRange"
                            item-value="value"
                            item-text="label"
                            :label="$t('Ultima prenotazione')" />
                </v-flex>

                <v-flex xs4 sm2>
                    <v-text-field class="filter-numeric-text-field" hide-details  v-model="filter.time_range_value" :label="$t('Numero')" box
                    ></v-text-field>
                </v-flex>

                <v-flex xs4 sm2>
                    <v-text-field
                            class="filter-numeric-text-field"
                            hide-details
                            v-model="filter.nights"
                            :label="$t('Numero Notti')"
                            box
                    ></v-text-field>
                </v-flex>


            </v-layout>
        </v-card>

    </v-container>
</template>

<script>
  import {mapState, mapActions} from 'vuex'
  import {parseDate, formatDate} from '../../../assets/helpers'
  import SaveBiResultDialog from '../SaveBiResultDialog'
  import BiLoadResultDialog from '../BiLoadResultDialog'
  export default {
    name: 'LastCheckOutPredictiveFilter',
    components: {SaveBiResultDialog, BiLoadResultDialog},
    methods: {
      ...mapActions('bi/qrLastCheckout', ['loadResultList']),
      formatDate,
      parseDate,
      openSaveDialog () {
        this.showSaveDialog = true
      },
      openOpenDialog () {
        this.loadResultList()
          .then(() => { this.showOpenDialog = true })
      }
    },
    computed: {
      ...mapState('bi/qrLastCheckout', ['filter', 'list', 'timeRange', 'panelFilter', 'filterOptions']),
      leadtimeOptions () {
        let res = []
        if (this.filterOptions.leadtime) {
          for (let i = 0; i < this.filterOptions.leadtime.length; i++) {
            let cur = this.filterOptions.leadtime[i]
            res.push(
              {value: cur, label: this.$t(cur)}
            )
          }
        }
        return res
      },
      hasQuery () {
        return this.list.length > 0
      }
    },
    data: () => ({
      showSaveDialog: false,
      showOpenDialog: false,
      fltCheckinDate: null,
      fltCheckinDateFormatted: '',
      fltCheckoutDateFormatted: '',
      valid: true,
      date: '',
      items: [],
      dates: [],
      fltDtMenuCheckIn: false,
      fltDtMenuCheckOut: false,
      row: false
    })
  }
</script>

<style lang="scss">
    .filter-numeric-text-field{width:100px;position:relative;top:3px}
</style>
