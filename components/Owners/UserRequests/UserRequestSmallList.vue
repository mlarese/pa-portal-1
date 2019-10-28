<template>
    <v-container row  class="user-request-list-small user-request-list pa-0">
        <v-layout column>
            <v-data-table
                    :headers="headers"
                    :items="openedList"
                    :loading="loading"
                    :no-data-text="$t('No request found')"
                    class="elevation-1 user-request-list-small-table user-request-list-table"
            >

                <v-progress-linear slot="progress" color="blue" indeterminate></v-progress-linear>
                <template slot="items" slot-scope="{item}">
                    <td> {{item.created| dmy}}  </td>
                    <td> {{item.mail}}  </td>
                    <td> {{$t(item.type)}}  </td>
                    <td nowrap="nowrap">
                        <v-tooltip top>

                            <v-btn slot="activator" flat icon color="blue" _click="onSendData(item)">
                                <v-icon>send</v-icon>
                            </v-btn>
                            <span>{{$t('Send data to user')}}</span>
                        </v-tooltip>


                    </td>
                </template>
                <v-alert slot="no-results" :value="true" color="warning" icon="warning">
                    {{$t('No request found')}}
                </v-alert>

                <template slot="pageText" slot-scope="{ pageStart, pageStop }">
                    {{$t('From')}} {{ pageStart }} {{$t('To')}} {{ pageStop }}
                </template>
            </v-data-table>
        </v-layout>
    </v-container>
</template>
<script>
  import UserRequestListBase from './UserRequestListBase'
  export default {
    name: 'UserRequestSmallList',
    mixins: [UserRequestListBase],
    props: ['loading'],
    computed: {
      openedList () {
        if (!this.list) {
          return []
        } else {
          return this.list.filter(o => o.status === 'open')
        }
      }
    },
    data () {
      const headers = [
        { text: this.$t('Request date'), value: 'created' },
        { text: this.$t('Email'), value: 'mail' },
        { text: this.$t('Type'), value: 'type' },
        { text: this.$t('Actions'), value: 'action' }
      ]
      return {
        tableTexts: {
          rowsPerPageText: this.$t('Rows per page'),
          rowsPerPageItems: [5, 10, 20, {'text': this.$t('All'), 'value': -1}]
        },
        headers
      }
    }
  }
</script>

<style lang="scss">
    $cell-height: 32px;

    .user-request-list-small {

        table.table thead tr, table.table tbody td, table.table tbody th {
            height: $cell-height;
            font-size:12px;
        }
    }

</style>
