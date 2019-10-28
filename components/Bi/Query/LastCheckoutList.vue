<template>
    <v-container row  class="last-check-out-list pa-0" >
        <v-data-table
                :headers="headers"
                :items="list"
                class="elevation-1"
                v-bind="tableTexts"
                :loading="isAjax"
        >

            <template slot="items" slot-scope="{item}">
                <!-- td>{{ item.id }}</td -->
                <td class="no-wrap">{{ $t(item.product) }}</td>
                <td class="no-wrap">{{ $t(item.origin) }}</td>
                <!-- td>{{ item.channel}}</td -->
                <td class="no-wrap">{{ item.country}}</td>
                <td class="no-wrap">{{ item.language}}</td>
                <td class="no-wrap">{{ $t(item.paxtype)}}</td>
                <td class="no-wrap">{{ $t(item.opened)  | dmy }}</td>
                <td class="no-wrap">{{ item.checkin | dmy}}</td>
                <td class="no-wrap">{{ item.checkout | dmy }}</td>
                <td class="no-wrap">{{ $t(item.leadtime)}}</td>
                <td class="no-wrap">{{ item.nights}}</td>
                <td class="no-wrap">{{ item.email}}</td>
                <td class="no-wrap">{{ item.name}} {{ item.surname}}</td>

                <td class="no-wrap">{{ $t(item.return_dates)}}</td>
            </template>
        </v-data-table>
    </v-container>
</template>

<script>
  import {mapState, mapGetters} from 'vuex'
  // import _findKey from 'lodash/findKey'
  export default {
    data () {
      const headers = [
        // { text: this.$t('Id'), value: 'id' },
        { text: this.$t('Product'), value: 'product' },
        { text: this.$t('Origin'), value: 'origin' },
        // { text: this.$t('Channel'), value: 'channel' },
        { text: this.$t('Nationality'), value: 'country' },
        { text: this.$t('Language'), value: 'language' },
        { text: this.$t('Pax type'), value: 'paxtype', width: 40 },
        { text: this.$t('Opened'), value: 'opened' },
        { text: this.$t('From'), value: 'checkin' },
        { text: this.$t('To'), value: 'checkout' },
        { text: this.$t('Leadtime'), value: 'leadtime' },
        { text: this.$t('Nights'), value: 'nights' },
        { text: this.$t('Email'), value: 'email' },
        { text: this.$t('Name'), value: 'name' },
        { text: this.$t('Ritorni'), value: 'return_dates' }
      ]
      return {
        tableTexts: {
          rowsPerPageText: this.$t('Rows per page'),
          rowsPerPageItems: [10, 20, 50, 100]
        },
        headers
      }
    },
    components: {
    },
    computed: {
      ...mapGetters('bi/qrLastCheckout', ['privaciesByEmail']),
      ...mapState('bi/qrLastCheckout', ['list']),
      ...mapState('api', ['isAjax'])
    }
  }
</script>

le>
