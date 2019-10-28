<template>
    <v-container grid-list-md>
        <v-layout class="user-filter" row wrap align-baseline>
        <v-flex xs9 sm5 >
            <v-text-field

                    append-icon="search"
                    box
                    v-model="criteria"
                    color="silver"
                    hide-details
                    :label="$t('Surname, Name, Email')"
            />

            <v-layout row wrap>
                <v-flex xs12 ml>
                    <v-select
                            class="mt-2"
                            box
                            v-model="domainFilter"
                            hide-details
                            item-text="name"
                            item-value="code"
                            :label="$t('Domain')"
                            :items="selectDomainList"
                    > </v-select>
                </v-flex>

            </v-layout>

        </v-flex>

        <v-flex xs3 sm1>
            <v-tooltip top v-if="false">
                <v-btn :disabled="!canSave" slot="activator" flat fab small @click="onReload">
                    <v-icon medium>replay</v-icon>
                </v-btn>
                <span v-text="$t('List refresh')"></span>
            </v-tooltip>
        </v-flex>

        <v-layout row wrap>
            <v-flex  xs12 sm5 class="mt-1">
                <v-btn-toggle v-model="search.toggleValue1" style="position: relative;top:4px" class="user-filter-toggle elevation-0 ">

                    <v-btn @click="setDateFilter" class="user-filter-date-toggle" flat :disabled="dateFilter==0">
                        <v-icon class="mr-1">today</v-icon>
                        <span v-text="$t('Today')"></span>
                    </v-btn>

                    <v-btn @click="setDateFilter" class="user-filter-date-toggle" flat :disabled="dateFilter==1">
                        <v-icon class="mr-1">calendar_today</v-icon>
                        <span v-text="$t('Yesterday')"></span>
                    </v-btn>

                    <v-btn @click="setDateFilter" class="user-filter-date-toggle" flat :disabled="dateFilter==2">
                        <v-icon class="mr-1">all_inclusive</v-icon>
                        <span v-text="$t('All')"></span>
                    </v-btn>


                </v-btn-toggle>
            </v-flex>

            <v-flex xs12  >

                <v-select
                        :disabled="!canSave"
                        class="mt-2"
                        box
                        multiple
                        chips
                        deletable-chips
                        v-model="languageFilter"
                        hide-details
                        hide-selected
                        item-text="label"
                        item-value="id"
                        :label="$t('Language')"
                        :items="selectLanguageList"
                > </v-select>
            </v-flex>
        </v-layout>
    </v-layout>
    </v-container>
</template>
<script>
  import {mapState, mapActions, mapMutations, mapGetters} from 'vuex'
  import {sync, get} from 'vuex-pathify'
  import format from 'date-fns/format'
  import subDays from 'date-fns/subDays'
  // import _values from 'lodash/values'

  let today = new Date()
  let yesterday = subDays(today, 1)

  let dateFiltersValues = [
    format(today, 'yyyy-MM-dd'),
    format(yesterday, 'yyyy-MM-dd'),
    ''
  ]

  export default {
    name: 'UserFilter',
    watch: {
      'domainFilter' () {
        this.setNeedRefresh(true)
      },
      'languageFilter' () {
        this.setNeedRefresh(true)
      },
      'search.criteria' () {
        this.setNeedRefresh(true)
      }
    },
    created () {
      this.setDateFilter()
      if (!this.domainFilter || this.domainFilter === '') {
        this.domainFilter = 'all'
      }
      if (!this.languageFilter) {
        this.languageFilter = []
      }
    },
    methods: {
      setDateFilter () {
        this.$nextTick(() => {
          this.setSearch({value: dateFiltersValues[this.search.toggleValue1], path: 'localDateCriteria'})
          this.searchListDelegate()
            .then(() => {
              this.setNeedRefresh(false)
            })
        })
      },
      ...mapMutations('terms', ['setNeedRefresh']),
      ...mapMutations('owners/users', ['setSearch']),
      ...mapActions('owners/users', ['searchList', 'searchListDelegate']),
      onReload () {
        this.$nextTick(() => {
          this.searchListDelegate()
            .then(() => {
              this.setNeedRefresh(false)
            })
        })
      }
    },
    computed: {
      selectDomainList () {
        let list = [{name: this.$t('all'), code: 'all'}]
        this.domainsList.forEach(it => {
          it.code = it.name
          list.push(it)
        })
        return list
      },
      ...mapGetters('auth', ['canSave']),
      selectLanguageList () {
        return this.comboLanguages
      },
      criteria: sync('owners/users/search@criteria'),
      dateFilter: get('owners/users/search@toggleValue1'),
      domainFilter: sync('owners/users/exportFilter@domain'),
      languageFilter: sync('owners/users/exportFilter@language'),
      ...mapState('owners/users', ['list', 'exportFilter', 'search']),
      ...mapState('domains', {'domainsList': 'list'}),
      ...mapState('app', ['comboLanguages'])
    }
  }
</script>

<style lang="scss">
     .user-filter-toggle {
         border: 1px solid #e2e2e2;
     }
     .user-filter-date-toggle.btn--active {
        background-color: #eeeeee !important;
        pointer-events: none;
    }
    .input-group__details{ display: none}
</style>
