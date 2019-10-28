<template>
    <v-container row class="owners-list">
        <list-bar
                to="/operators/owners/add"
                color="blue lighten-1"
                caption="Create New Owner"
                title="Management Owners"
                sub-title="List of active Management Owners"
        />
                <v-toolbar dense class="py-0 px-4  elevation-1" color="white">
                        <v-text-field
                            v-model="search"
                            append-icon="search"
                            :label="$t('Search')"
                            single-line
                            class="text-box-search"
                            hide-details
                        ></v-text-field>

                        <v-tooltip top>
                            <JsonExcel
                                ref="jsonExcel"
                                @click.native="onExport"
                                slot="activator"
                                name="titolari.csv"
                                class="ml-3"
                                style="cursor:pointer"
                                :data="filteredItems"
                                type="csv"
                                :fields="exportFields"
                            >
                                <v-icon>
                                    save_alt
                                </v-icon>

                            </JsonExcel>
                            {{$t('Csv Export')}}
                        </v-tooltip>
                </v-toolbar>

        <v-data-table
                ref="ownersDatatable"
                :headers="headers"
                :items="list"
                :search="search"
                class="elevation-1"
                v-bind="tableTexts"
        >

            <template slot="items" slot-scope="{item}">
                <td :class="{'white': item.active, 'orange': !item.active}">{{ item.company }}</td>
                <td :class="{'white': item.active, 'orange': !item.active}">{{ item.email }}</td>
                <td :class="{'white': item.active, 'orange': !item.active}">
                    {{ item.surname }} {{ item.name!=item.surname?item.name:'' }}
                </td>
                <td :class="{'white': item.active, 'orange': !item.active}">{{ item.language }}</td>
                <td class="justify-center layout px-0">
                    <nuxt-link :to="'/operators/owners/'+ item.id + '?mode=edit'"  active-class="">
                        <v-btn flat icon color="blue">
                        <v-icon>edit</v-icon>
                    </v-btn>
                    </nuxt-link>

                    <v-tooltip left>
                        <v-btn slot="activator" icon class="mx-0" @click="onLayout(item)">
                            <v-icon color="green">mail</v-icon>
                        </v-btn>
                        {{$t('Double-optin Email layouts')}}
                    </v-tooltip>

                    <v-tooltip left v-if="!item.active">
                        <v-btn slot="activator" icon class="mx-0" @click="onActivate(item)">
                            <v-icon color="green">play_arrow</v-icon>
                        </v-btn>
                        {{$t('activate')}}
                    </v-tooltip>

                    <v-tooltip left v-if="item.active">
                        <v-btn slot="activator" icon class="mx-0" @click="onDeactivate(item)">
                            <v-icon color="red">pause</v-icon>
                        </v-btn>
                        {{$t('deactivate')}}
                    </v-tooltip>

                </td>
            </template>

            <v-alert slot="no-results" :value="true" color="warning" icon="warning">
                {{$t('No owner found')}}
            </v-alert>

            <template slot="pageText" slot-scope="{ pageStart, pageStop }">
                {{$t('From')}} {{ pageStart }} {{$t('To')}} {{ pageStop }}
            </template>
        </v-data-table>

    </v-container>
</template>

<script>
  import {mapState, mapMutations} from 'vuex'
  import {dmy} from '../../../assets/filters'
  import ListBar from '../../General/ListBar'
  import JsonExcel from '../../General/JsonExcelCsv'
  import _defer from 'lodash/defer'

  const module = 'owners'
  export default {
    name: 'OwnersList',
    filters: {dmy},
    methods: {
      ...mapMutations('layouts', ['setCurrentOwner']),
      onExport () {
        let oldPage = this.$refs.ownersDatatable.computedPagination.rowsPerPage
        this.$refs.ownersDatatable.computedPagination.rowsPerPage = -1
        this.csvValues = this.$refs.ownersDatatable.filteredItems
        _defer(() => { this.$refs.ownersDatatable.computedPagination.rowsPerPage = oldPage })
      },
      onActivate (owner) {
        if (!confirm(this.$t('do you confirm?'))) {
          return
        }
        owner.active = true
      },
      onDeactivate (owner) {
        if (!confirm(this.$t('do you confirm?'))) return
        owner.active = false
      },
      onLayout (owner) {
        this.$router.push(`/owners/layouts/${owner.id}`)
      }
    },
    data () {
      const headers = [
        { text: this.$t('Company'), value: 'company' },
        { text: this.$t('Email'), value: 'email' },
        { text: this.$t('Surname') + ' ' + this.$t('Name'), value: 'surname' },
        { text: this.$t('Language'), value: 'language' },
        { text: this.$t('Actions'), value: 'action', sortable: false }
      ]
      return {
        tableTexts: {
          rowsPerPageText: this.$t('Rows per page'),
          rowsPerPageItems: [15, 30, 50, {'text': this.$t('All'), 'value': -1}]
        },
        csvValues: [],
        search: '',
        module,
        headers
      }
    },
    components: {
      ListBar, JsonExcel
    },
    computed: {
      ...mapState(module, ['list']),
      production () {
        return !(process.env.NODE_ENV === 'development')
      },
      exportFields () {
        return {
          id: 'id',
          surname: 'surname',
          company: 'company',
          name: 'name',
          email: 'email',
          language: 'language',
          country: 'country',
          zip: 'zip',
          address: 'address',
          city: 'city',
          active: 'active',
          county: 'county'
        }
      },
      filteredItems () {
        return this.csvValues
      }
    }
  }
</script>

<style lang="scss">
    .owner-list-item-not-active {
        background: red !important;
        color: white;
    }
</style>
