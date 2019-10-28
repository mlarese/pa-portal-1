<template>
    <v-container row  class="user-request-lists">
        <v-layout column>
            <v-layout mx-2 py-2>
                <span class="title">{{$t('User Requests')}}</span>
            </v-layout>

            <v-data-table
                    :headers="headers"
                    :items="list"
                    :hide-actions="true"
                    :loading="isAjax"
                    class="elevation-1"
            >

                <v-progress-linear slot="progress" color="blue" indeterminate></v-progress-linear>
                <template slot="items" slot-scope="{item}">
                    <td>{{ item.mail }}</td>
                    <td>{{ $t(item.status + '_')}}</td>
                    <td>{{item.created| dmy}}</td>
                    <td>{{ item.lastAccess | dmy}}</td>
                    <td nowrap="nowrap">
                        <!-- nuxt-link :to="'owner/UserRequest/'+ item.uId">
                            <v-btn flat icon color="green">
                                <v-icon>edit</v-icon>
                            </v-btn>
                        </nuxt-link>
                        <v-btn flat icon color="red">
                            <v-icon>delete</v-icon>
                        </v-btn>
                        <v-btn flat icon color="blue">
                            <v-icon>add</v-icon>
                        </v-btn -->
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
  import {mapState} from 'vuex'
  export default {
    name: 'UserRequestList',
    data () {
      const headers = [
        { text: this.$t('Mail'), value: 'mail' },
        { text: this.$t('Status'), value: 'status' },
        { text: this.$t('Created'), value: 'created' },
        { text: this.$t('Last access'), value: 'lastAccess' },
        { text: this.$t('Actions'), value: 'action' }
      ]
      return {
        tableTexts: {
          rowsPerPageText: this.$t('Rows per page'),
          rowsPerPageItems: [5, 10, 20, {'text': this.$t('All'), 'value': -1}]
        },
        headers
      }
    },
    computed: {
      ...mapState('owners/userrequests', ['list', 'search']),
      ...mapState('api', ['isAjax'])
    }
  }
</script>

