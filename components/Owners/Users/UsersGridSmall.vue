<template>
    <div class="users-grid-small  pa-0">

        <v-data-table
                :hide-actions="false"
                :headers="headers"
                :items="todayList"
                class="elevation-1 surfers-list-table"
                v-bind="tableTexts"
                :loading="loading"
                :no-data-text="$t('No user found') + ' ' + dateFilterText"
        >

            <template slot="items" slot-scope="p">
                <tr>

                    <td>
                        <span ><b>{{   p.item.email }}</b></span><br>
                        {{p.item.domain + p.item.site}}
                    </td>

                    <td class="justify-center layout px-0 pt-2" >
                        <nuxt-link :to="'/owners/usersdash/'+ encodedId(p.item.email) + '?mode=edit'">
                            <v-tooltip left>
                                <v-btn slot="activator" flat small icon color="blue" class="pa-0 ma-0">
                                    <v-icon>edit</v-icon>
                                </v-btn>
                                <span>{{$t('Edit user')}}</span>
                            </v-tooltip>
                        </nuxt-link>

                    </td>
                </tr>
            </template>

            <template slot="pageText" slot-scope="{ pageStart, pageStop, itemsLength }">
                <span>
                    {{$t('From')}} {{ pageStart }} {{$t('To')}} {{ pageStop }}
                </span>
                <span class="ml-2">
                    {{$t('of')}} <b> {{ itemsLength }}</b>
                </span>


            </template>

            <v-progress-linear slot="progress" color="blue" indeterminate></v-progress-linear>

        </v-data-table>
    </div>
</template>
<script>
  import {mapState} from 'vuex'
  import UsersGrid from './UsersGrid'

  const module = 'owners/users'

  export default {
    name: 'UsersGridSmall',
    extends: UsersGrid,
    props: ['loading'],
    data () {
      const globalHeaders = [
        { text: this.$t('Email') + '/' + this.$t('Page'), value: 'email' },
        { text: this.$t('Actions'), value: 'action', sortable: false, align: 'center' }
      ]
      return {
        formDateFilter: '',
        tableTexts: {
          rowsPerPageText: this.$t('Rows per page'),
          rowsPerPageItems: [7, 20, 50, {'text': this.$t('All'), 'value': -1}]
        },
        module,
        headers: globalHeaders
      }
    },
    computed: {
      ...mapState(module, ['todayList'])
    }

  }
</script>
<style lang="scss">
    $cell-height: 42px;

    .users-grid-small {
        table.table thead tr, table.table tbody td, table.table tbody th {
            height: $cell-height;
            font-size:12px;
        }
    }
</style>
