<template>
    <v-layout column class="treatment-filter ">
        <div class="blue-grey lighten-5">
            <v-layout row wrap>
                <v-flex xs12 sm4 v-for="(treatment, i) in mandatoryTermFilter" :key="i" class="py-2 left-bordered">
                    <v-layout row wrap >
                        <v-flex xs12 class="pl-2">
                            <span class="treatment-flag">
                                <v-checkbox
                                        color="blue darken-1"
                                        hide-details
                                        small
                                        @change="onTreatmentChange(treatment)"
                                        class="treatment-flag-checkbox"
                                        v-model="treatment.selected"
                                        :label="treatment.name"/>
                            </span>

                        </v-flex>
                    </v-layout>

                    <template v-for="(term, j) in treatment.terms">

                        <v-layout row wrap class="pl-4" :key="j">
                            <v-flex   xs1>
                                <v-checkbox
                                        color="blue darken-1"
                                        hide-details
                                        small
                                        @change="onTermChange(term, treatment)"
                                        class="treatment-flag-checkbox"
                                        v-model="term.selected"
                                        _label="term.name"/>

                            </v-flex>
                            <v-flex   xs11 class="caption pr-3">
                                <div class="pl-2">
                                    <v-divider></v-divider>
                                    {{term.name}}
                                </div>

                            </v-flex>
                        </v-layout>

                    </template>
                </v-flex>
            </v-layout>
        </div>
        <v-layout column v-if="!hasSelectedTreatment">
            <v-flex class="text-xs-center" xs12>

                    <v-alert :value="true" outline color="info" icon="info">
                        <div v-if="canSeeNoAgreementPrivacies">
                        {{$t('Searching no subscriptions users')}}
                        </div>

                        <div v-else>
                            {{$t('You cannot see no subscriptions users')}}
                        </div>
                    </v-alert>

            </v-flex>
        </v-layout>

        <v-layout v-if="showRefreshBtn" column>
            <v-flex class="text-xs-center" xs12 v-if="hasRefreshButton">
                <v-btn @click="onReload" flat>
                    <span>{{$t('Click here to refresh')}}</span> <v-icon>replay</v-icon>
                </v-btn>

            </v-flex>
        </v-layout>

    </v-layout>
</template>
<script>
  import {mapState, mapMutations, mapActions, mapGetters} from 'vuex'
  // import _cloneDeep from 'lodash/cloneDeep'
  import _forIn from 'lodash/forIn'

  export default {
    name: 'TreatmentsFilter',
    data () {
      return {
        mandatoryTermFilter: [],
        filter: {
          person: '',
          treatments: {},
          language: ''
        }
      }
    },
    methods: {
      onReload () {
        if (!this.canSearchUsers) return
        this.searchListDelegate()
        this.setNeedRefresh(false)
      },
      onTermChange (term, treatment) {
        if (term.selected) {
          treatment.selected = true
        } else {
          const selected = this.selectedTermsCount(treatment)
          treatment.selected = (selected > 0)
        }

        this.onChange(treatment)
      },
      onTreatmentChange (treatment) {
        if (!treatment.selected) {
          this.setSelectAllTerms(treatment.terms, false)
        } else {
          this.setSelectAllTerms(treatment.terms, true)
        }
        this.onChange(treatment)
      },
      ...mapActions('owners/users', ['searchListDelegate']),
      ...mapMutations('owners/users', ['setExportFilter', 'setExportFilterTreatments']),
      ...mapMutations('terms', ['setNeedRefresh']),
      setSelectAllTerms (terms, selected) {
        _forIn(terms, o => { o.selected = selected })
      },
      onChange (treatment) {
        this.updateTreatment(treatment)
      },
      updateTreatment (treatment) {
        // const idx = this.filter.treatments.findIndex(t => t.code === treatment.code)

        this.setNeedRefresh(true)
        this.exportTreatments()
      },
      exportTreatments () {
        let tr = []
        if (!this.filter.treatments) {
          this.filter.treatments = []
        }
        this.filter.treatments.forEach(t => { if (t.selected) tr.push(t) })
        this.setExportFilterTreatments(tr)
      },
      selectedTermsCount (treatment) {
        return treatment.terms.reduce((r, v) => {
          if (v.selected) {
            r++
          }
          return v.selected ? r++ : r
        }, 0)
      }
    },
    created () {
      this.mandatoryTermFilter = this.termFilter
      this.filter.treatments = this.mandatoryTermFilter
      this.exportTreatments()
    },
    computed: {
      hasSelectedTreatment () {
        if (!this.exportFilter.treatments) {
          return false
        }
        return this.exportFilter.treatments.length > 0
      },
      showRefreshBtn () {
        return this.canSearchUsers
      },
      canSearchUsers () {
        if (!this.search.needRefresh) return false
        if (!this.canSeeNoAgreementPrivacies && !this.hasSelectedTreatment) return false
        return true
      },
      ...mapGetters('auth', ['canSeeNoAgreementPrivacies']),
      ...mapState('auth', ['user']),
      ...mapState('terms', ['termFilter', 'search']),
      ...mapState('owners/users', ['exportFilter'])
    },
    props: {'hasRefreshButton': {default: true}}
  }
</script>

<style lang="scss">

    .left-bordered {
        border-right: 1px solid #e1e1e1;
    }
    .treatment-flag-checkbox {
        .input-group--selection-controls__ripple {
            height: 24px;
            width: 24px;
            left: 9px;
        }
        label {
            font-size: 12px;
            line-height: 20px;
            color: rgba(0, 0, 0, 0.8) !important;
        }
        .icon {
            font-size: 18px
        }
        .input-group--text-field-box .input-group__input, .input-group__input {
            min-height: 20px;
        }

    }

</style>
