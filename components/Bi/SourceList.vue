<template>
    <v-container row  class="source_list">
        <v-data-table
                :headers="headers"
                :items="list"
                :hide-actions="false"
                class="elevation-1"
        >

            <template slot="items" slot-scope="{item}">
                <td>{{ item.rescount }}</td>
                <td>{{item.opened_year}}/{item.{opened_month}}/{{item.opened_year}}</td>
                <td>{{item.checkin_month}}/{{item.checkin_month}}/{{item.checkin_month}}</td>
                <td>{{item.checkout_month}}/{{item.checkout_month}}/{{item.checkout_month}}</td>
                <td>{{ item.origin}}</td>
                <td>{{ item.country}}</td>
            </template>
        </v-data-table>
    </v-container>
</template>

<script>
    export default {
      data () {
        const headers = [
          { text: this.$t('Rescount'), value: 'rescount' },
          { text: this.$t('Open'), value: 'open' },
          { text: this.$t('Check In'), value: 'checkin' },
          { text: this.$t('Check Out'), value: 'checkout' },
          { text: this.$t('Origin'), value: 'origin' },
          { text: this.$t('Country'), value: 'country' }
        ]
        return {
          tableTexts: {
            rowsPerPageText: this.$t('Rows per page'),
            rowsPerPageItems: [5, 10, 25, {'text': this.$t('All'), 'value': -1}]
          },
          headers
        }
      },
      components: {
      }
    }
</script>

<style scoped>

</style>
