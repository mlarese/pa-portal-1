<template>
    <v-container fluid grid-list-sm v-if="filter" class="pa-0 ma-0">
        <ShareListDialog
                :show="showShareDialog"
                :adapter="adapter"
                @cancel="hideShareDialog"
                :send-data="true"
                :pay-load="privaciesListExport"
        />
        <v-toolbar class="elevation-1 mb-1" dark dense color="light-blue darken-2">
            <v-toolbar-title>{{$t('Data & Query 2.0')}}</v-toolbar-title>
            <v-spacer></v-spacer>

            <v-menu :disabled="privaciesList.length == 0"
                    _v-if="canShare"
                    origin="center center"
                    transition="scale-transition"
                    bottom
            >
                <v-btn slot="activator" class="elevation-0 text-upper"   small  color="info" :disabled="privaciesList.length == 0"  >
                    {{$t('Share list')}}
                </v-btn>
                <v-list >
                    <v-list-tile v-for="(item, i) in shareMenuItems" :key="i" @click="">
                        <v-list-tile-title @click="onShowShareList(item.adapter)">
                            {{ $t(item.title) }}
                        </v-list-tile-title>
                    </v-list-tile>
                </v-list>
            </v-menu>


            <v-btn @click="panelFilter.queryFltPanelOpen=!panelFilter.queryFltPanelOpen" flat fab small class="mt-1">
                <v-icon v-if="!panelFilter.queryFltPanelOpen">keyboard_arrow_down</v-icon>
                <v-icon v-else>keyboard_arrow_up</v-icon>
            </v-btn>
        </v-toolbar>
        <v-card class="pa-2 elevation-1" v-if="panelFilter.queryFltPanelOpen">
            <v-layout wrap align-center class="pa-0">

                <v-flex xs12 sm4 d-flex >
                    <v-select
                            hide-details
                            v-model="filter.product"
                            :items="productOptions"
                            attach
                            autocomplete
                            chips
                            item-text="product"
                            item-value="product"
                            :label="$t('Prodotti')"
                            multiple
                    ></v-select>
                </v-flex>


                <v-flex xs12 sm4 d-flex>
                    <v-select
                            hide-details
                            v-model="filter.origin"
                            :items="originOptions"
                            attach
                            chips
                            autocomplete
                            :label="$t('Origin')"
                            item-value="value"
                            item-text="label"
                            multiple
                    ></v-select>
                </v-flex>

                <v-flex xs12 sm4 d-flex>
                    <v-select
                            hide-details
                            v-model="filter.channel"
                            :items="channelOptions"
                            attach
                            chips
                            autocomplete
                            :label="$t('Channel')"
                            item-value="value"
                            item-text="label"
                            multiple
                    ></v-select>
                </v-flex>

                <v-flex xs16 sm4 d-flex>
                    <v-select
                            hide-details
                            v-model="filter.nationality"
                            :items="countryOptions"
                            item-value="country"
                            item-text="country"
                            attach
                            chips
                            autocomplete
                            :label="$t('Nazione')"
                            multiple
                    ></v-select>
                </v-flex>

                <v-flex xs6 sm4 d-flex>
                    <v-select
                            hide-details
                            v-model="filter.language"
                            :items="languageOptions"
                            attach
                            chips
                            autocomplete
                            :label="$t('Language')"
                            item-value="language"
                            item-text="language"
                            multiple
                    ></v-select>
                </v-flex>

                <v-flex xs12 sm4 d-flex>
                    <v-select hide-details v-model="filter.paxtype"  :items="paxTypeOptions"
                            item-value="value"
                            item-text="label"  attach chips :label="$t('Tipologia di ospite')" multiple
                    ></v-select>
                </v-flex>
            </v-layout>

            <v-layout wrap align-center class="pa-0">
                <v-flex xs6 sm4>
                    <v-select
                            hide-details
                            v-model="filter.leadtime"
                            :items="leadtimeOptions"
                            item-value="value"
                            item-text="label"
                            attach
                            chips
                            autocomplete
                            :label="$t('Lead time')"
                            multiple
                    ></v-select>
                </v-flex>

                <v-flex xs6 sm2>
                    <v-select
                            hide-details
                            v-model="filter.nights"
                            :label="$t('Numero Notti')"
                            :items="nightsOptions"
                            attach
                    ></v-select>
                </v-flex>
            </v-layout>


            <v-layout wrap align-center class="pa-0">
                <v-flex xs12 sm6>
                    <v-toolbar   class="elevation-0 extradense">
                        <v-toolbar-title class="subheader">{{$t('Check-in')}}</v-toolbar-title>
                    </v-toolbar>
                    <el-date-picker format="dd/MM/yyyy" value-format="yyyy-MM-dd" class="mr-1" :placeholder="$t('From')" v-model="filter.checkin_from" type="date" style />
                    <el-date-picker format="dd/MM/yyyy" value-format="yyyy-MM-dd" :placeholder="$t('To')" v-model="filter.checkin_to" type="date" style />
                </v-flex>


                <v-flex xs12 sm6>
                    <v-toolbar   class="elevation-0 extradense">
                        <v-toolbar-title class="subheader">{{$t('Check-out')}}</v-toolbar-title>
                    </v-toolbar>
                    <el-date-picker format="dd/MM/yyyy" value-format="yyyy-MM-dd" class="mr-1" :placeholder="$t('From')" v-model="filter.checkout_from" type="date" style />
                    <el-date-picker format="dd/MM/yyyy" value-format="yyyy-MM-dd" :placeholder="$t('To')" v-model="filter.checkout_to" type="date" style />
                </v-flex>
            </v-layout>

            <v-layout wrap align-center class="pa-0">
                <v-flex xs12 sm6>
                    <v-toolbar   class="elevation-0 extradense">
                        <v-toolbar-title class="subheader">{{$t('Data prenotazione')}}</v-toolbar-title>
                    </v-toolbar>
                    <el-date-picker format="dd/MM/yyyy" value-format="yyyy-MM-dd" class="mr-1" :placeholder="$t('From')" v-model="filter.opendate_from" type="date" style />
                    <el-date-picker format="dd/MM/yyyy" value-format="yyyy-MM-dd" :placeholder="$t('To')" v-model="filter.opendate_to" type="date" style />
                </v-flex>



                <v-flex xs4 sm2 class="mt-3">
                    <v-select
                            hide-details
                            v-model="filter.time_range_type"
                            :items="timeRange"
                            item-value="value"
                            item-text="label"

                            :label="$t('Ultima prenotazione')" />
                </v-flex>

                <v-flex xs4 sm2 class="mt-3">
                    <v-text-field
                            class="filter-numeric-text-field" hide-details
                            v-model="filter.time_range_value" :label="$t('Numero')"
                            box
                    ></v-text-field>
                </v-flex>


            </v-layout>

            <v-layout class="mt-2">
                <v-flex xs12>
                    <div class="title mb-2">{{$t('Filter users according to accepted regulations')}}</div>
                    <TreatmentsFilter :hasRefreshButton="false"></TreatmentsFilter>
                </v-flex>
            </v-layout>
        </v-card>
    </v-container>
</template>

<script>
  import {mapState} from 'vuex'
  import ShareListDialog from '../../Owners/Users/ShareListDialog'
  import TreatmentsFilter from '../../Owners/Treatments/TreatmentsFilter'
  import _keyBy from 'lodash/keyBy'

  let nightsOptions = ['']

  for (let i = 1; i < 90; i++) nightsOptions.push(i)

  export default {
    name: 'LastCheckOutFilter',
    components: { TreatmentsFilter, ShareListDialog },
    methods: {
      blankTimeRangeValue () {
        this.filter.time_range_value = null
      },
      onShowShareList (adapter) {
        this.adapter = adapter
        this.showShareDialog = true
      },
      hideShareDialog () {
        this.showShareDialog = false
      }
    },
    computed: {
      ...mapState('bi/qrLastCheckout', ['filter', 'filterOptions', 'panelFilter', 'timeRange', 'list', 'privaciesList']),
      privaciesListExport () {
        if (this.privaciesList && this.privaciesList.length && this.privaciesList.length > 0) { return _keyBy(this.privaciesList, 'email') } else { return [] }
      },
      productOptions () {
        if (this.filterOptions.product) return this.filterOptions.product
        return []
      },
      channelOptions () {
        let res = []
        if (this.filterOptions.channel) {
          for (let i = 0; i < this.filterOptions.channel.length; i++) {
            let channel = this.filterOptions.channel[i]
            res.push(
              {value: channel, label: this.$t(channel)}
            )
          }
        }
        return res
      },
      originOptions () {
        return this.filterOptions.origin
      },
      languageOptions () {
        if (this.filterOptions.language) return this.filterOptions.language
        return []
      },
      countryOptions () {
        if (this.filterOptions.country) return this.filterOptions.country
        return []
      },
      paxTypeOptions () {
        if (this.filterOptions.paxType) return this.filterOptions.paxType
        return []
      },
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
      }
    },
    data: () => ({
      adapter: 'csv',
      shareMenuItems: [
        // {title: 'Csv Export', adapter: 'csv'},
        // {title: 'Mailone Export', adapter: 'mailone'},
        {title: 'Mailup Export', adapter: 'mailup'}
      ],
      valid: true,
      showShareDialog: false,
      date: '',
      items: [],
      dates: [],
      menu: false,
      row: false,
      nightsOptions
    })
  }
</script>

