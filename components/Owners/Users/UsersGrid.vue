<template>
    <div>
        <v-layout class="subheading mb-2" v-if="formFilterValidList.length>0">
            <b>{{$t('Users found')}} {{formFilterValidList.length}}</b>
        </v-layout>

        <v-data-table
            :headers="headers"
            :items="formFilterValidList"
            class="elevation-1 surfers-list-table"
            v-bind="tableTexts"
            :pagination.sync="grid.pagination"
            :loading="isAjax"
            sort-icon="keyboard_arrow_down"
            :no-data-text="$t('No user found') + ' ' + dateFilterText"
        >
            <template slot="items" slot-scope="p">

                <tr :title="p.item.termName">
                    <td>
                        <b>{{ p.item.email }}</b>
                    </td>
                    <td>
                        <span style="position: relative;top:2px;">{{ p.item.created |dmy }}</span>
                    </td>
                    <td>
                        <div >
                            {{ p.item.domain+p.item.site }}
                            <div class="ml-3" v-for="fl in p.item._flags_" style="white-space: nowrap">
                                <input :disabled="true" type="checkbox" v-model="fl.selected"> {{fl.code}}

                                <span v-if="fl.mandatory">*</span>
                                <span v-if="fl.unsubscribe">({{fl.user}})  </span>
                            </div>

                        </div>
                    </td>


                    <td> {{ p.item.surname }}  {{ p.item.name }}</td>
                    <td> {{ p.item.language }} </td>

                    <td class="justify-center layout px-0 pt-2">
                        <nuxt-link :to="'/owners/users/'+ encodedId(p.item.email) + '?mode=edit'">
                            <v-tooltip left>
                                <v-btn slot="activator" flat small icon color="blue" class="pa-0 ma-0">
                                    <v-icon>edit</v-icon>
                                </v-btn>
                                <span>{{$t('Edit user')}}</span>
                            </v-tooltip>
                        </nuxt-link>

                        <nuxt-link :to="'/owners/users/'+ p.item.id + '?mode=view'" v-if="false">
                            <v-btn icon class="mx-0">
                                <v-icon color="blue">search</v-icon>
                            </v-btn>
                        </nuxt-link>
                        <v-btn flat icon color="red" v-if="false">
                            <v-icon>delete</v-icon>
                        </v-btn>
                    </td>
                </tr>
            </template>

            <v-progress-linear slot="progress" color="blue" indeterminate></v-progress-linear>

            <template slot="expand" slot-scope="{item}">
                <v-card flat>
                    <v-card-text class="">Ip: {{item.ip}}</v-card-text>
                    <v-card-text class="py-0 my-0" v-for="(f, i) in item.privacyFlags" :key="i">
                        <v-icon v-if="f.selected">check_box</v-icon>
                        <v-icon v-else>check_box_outline_blank</v-icon>
                        {{f.code}} dd
                        <span dv-if="f.mandatory">(Man)</span>
                    </v-card-text>
                    <v-card-text></v-card-text>
                </v-card>
            </template>

            <template slot="pageText" slot-scope="{ pageStart, pageStop }">
                {{$t('From')}} {{ pageStart }} {{$t('To')}} {{ pageStop }}
            </template>

        </v-data-table>
    </div>
</template>
<script>
  import {mapState, mapGetters} from 'vuex'
  const module = 'owners/users'

  export default {
    name: 'UsersGrid',
    methods: {
      encodedId (email) {
        return encodeURI(btoa(email))
      }
    },
    data () {
      const headers = [
        { text: this.$t('Email'), value: 'email' },
        { text: this.$t('Created'), value: 'created', width: '100px' },
        { text: this.$t('Flags'), value: 'id', sortable: false },
        { text: this.$t('Surname') + ' ' + this.$t('Name'), value: 'surname' },
        { text: this.$t('Language'), value: 'language' },
        { text: this.$t('Actions'), value: 'action' }
      ]

      return {
        formDateFilter: '',
        tableTexts: {
          rowsPerPageText: this.$t('Rows per page'),
          rowsPerPageItems: [10, 20, 50, {'text': this.$t('All'), 'value': -1}]
        },
        module,
        headers
      }
    },
    computed: {
      ...mapGetters(module, ['filterListByDate']),
      ...mapState(module, ['list', 'search', 'grid']),
      ...mapState('api', ['isAjax']),
      dateFilterText () {
        if (this.search.toggleValue1 === 0) {
          return this.$t('Today')
        } else if (this.search.toggleValue1 === 1) {
          return this.$t('Yesterday')
        }

        return ''
      },
      formFilterValidList () {
        return this.validList
      },
      validList () {
        if (this.filterListByDate.filter) {
          return this.filterListByDate.filter(o => o.email && o.email.includes('@'))
        } else {
          return []
        }
      }
    }

  }
</script>
<style lang="scss">
    $cell-height: 32px;

    .surfers-list-table {
        tr {
            cursor: pointer
        }
        td {
            cursor: pointer;
            padding-right: 0 !important;
            .btn {height:26px!important; width:26px }
        }
        table.table thead tr, table.table tbody td, table.table tbody th {
            height: $cell-height;
            font-size:12px;
        }
    }
</style>
