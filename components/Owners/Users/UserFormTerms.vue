<template>
    <v-layout class="owner-user-form-terms" column>

        <v-flex xs12 class=" lighten-5 pa-3">

                <v-layout row wrap>
                    <v-flex xs12 sm6 class="title pt-3"  v-if="multiPrivacy">
                        {{$t('Terms')}}
                    </v-flex>
                    <v-flex xs12 sm6 class="text-xs-right" v-if="showSmartBar">
                        <SmallEditSaveButtonBar
                            :hide-delete="true"
                            :edit-mode="dataEdit"
                            @edit="dataEdit=true"
                            @save="onSave"
                            @cancel="dataEdit=false"
                        />
                    </v-flex>
                </v-layout>

            <!-- div class="mb-2">{{$t('Subscription detail')}}</div -->

            <template v-for="(pages, termId, i) in recordList">
                <v-layout row wrap >
                    <v-flex xs12>
                        <table class="owner-user-form-terms-data-table mb-3">
                            <template v-for="(term, page, j) in pages">
                                <template v-if="j==0">
                                    <tr class="caption owner-user-form-terms-data-table-privacy-name">
                                        <td colspan="3" class="pl-3 pt-2">
                                            <b>
                                                {{ termName(term) }}
                                            </b>
                                        </td>

                                    </tr>
                                    <tr class="caption">
                                        <th width="1%">{{$t('Date')}}</th>
                                        <th width="1%">{{$t('Time')}}</th>
                                        <th width="50%">{{$t('Treatments')}}</th>
                                        <th width="30%">{{$t('Privacy url')}}/IP</th>
                                    </tr>
                                </template>

                                <template v-if="term">
                                    <tr class="caption">

                                        <td  v-if="term.created">{{ term.created  | dmy }}</td>
                                        <td  v-if="term.created"> {{ term.created | time }} </td>


                                        <td>
                                            <span  v-if="term.privacy">
                                                <template v-for="p in term.privacy.paragraphs">
                                                    <div>
                                                        <div><i>{{p.title}}</i></div>
                                                        <template v-for="(t, z) in p.treatments">
                                                            <div class="ml-4">
                                                                <input
                                                                        class="bigger-check"
                                                                        type="checkbox"
                                                                        :disabled="flagDisabled(t)"
                                                                        v-model="t.selected"
                                                                        @click="addChangedTerm(term)"
                                                                /> {{$t(t.code)}}
                                                                <span class="ml-2" v-if="t.mandatory || t.restrictive">
                                                                    (<span v-if="t.mandatory">{{$t('Mandatory')}} </span>
                                                                    <span v-if="t.restrictive">{{$t('Restrictive')}} </span>)
                                                                </span>
                                                            </div>
                                                        </template>
                                                    </div>
                                                </template>
                                            </span>
                                        </td>
                                        <td>
                                            {{term.page}}<br>{{term.ip}}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colspan="4" class="pa-0" style="border-bottom:3px solid grey">
                                            <v-expansion-panel class="elevation-0">
                                                <v-expansion-panel-content>
                                                    <div slot="header">{{$t('Other data')}}</div>
                                                    <v-card>
                                                        <v-card-text class="grey lighten-3">
                                                            <template v-for="(field, fi) in term.form">
                                                                <div :key="fi">
                                                                    <b>{{fi}}</b>: {{field}}
                                                                </div>

                                                            </template>
                                                        </v-card-text>
                                                    </v-card>
                                                </v-expansion-panel-content>
                                            </v-expansion-panel>
                                        </td>
                                    </tr>

                                    <tr v-if="term.properties && term.properties.history">
                                        <td colspan="4" class="pa-0" style="border-bottom:3px solid grey">
                                            <v-expansion-panel class="elevation-0">
                                                <v-expansion-panel-content>
                                                    <div slot="header">{{$t('History')}}</div>
                                                    <v-card>
                                                        <v-card-text class="grey lighten-3"  style="font-size: 12px; ">

                                                            <template v-for="h in term.properties.history">

                                                                <div>
                                                                    {{h.update | dmy}} {{h.update | time}}  <b>{{h.user }}</b>
                                                                    <template v-for="v in h.variations">
                                                                        {{$t(v.action)}} {{v.flag}}
                                                                    </template>

                                                                </div>

                                                            </template>
                                                        </v-card-text>
                                                    </v-card>
                                                </v-expansion-panel-content>
                                            </v-expansion-panel>
                                        </td>
                                    </tr>


                                </template>

                            </template>
                        </table>
                    </v-flex>
                </v-layout>
            </template>
        </v-flex>

    </v-layout>
</template>
<script>
  import {mapState, mapActions, mapGetters} from 'vuex'
  import SmallEditSaveButtonBar from '../../General/SmallEditSaveButtonBar'
  const module = 'owners/users'

  export default {
    name: 'UserFormTerms',
    methods: {
      onSave () {
        this.$nuxt.$loading.start()
        this.saveAllTerms(this.modified)
          .then(() => {
            this.loadRecordList({id: this.params.id})
            this.$nuxt.$loading.finish()
            this.dataEdit = false
          })
          .catch(() => this.$nuxt.$loading.finish())
      },
      flagDisabled (t) {
        if (!this.dataEdit) return true

        if (t.mandatory) {
          if (this.allowAll) return false
          else return true
        } else {
          return false
        }
      },
      allFlags (term) {
        if (term && term.paragraphs) {
        } else {
          return []
        }
        const flags = []
        for (let i = 0; i < term.paragraphs.length; i++) {
          let p = term.paragraphs[i]
          for (let j = 0; j < p.treatments.length; j++) {
            const {code, selected, mandatory} = p.treatments[j]
            flags.push({code, selected, mandatory})
          }
        }
        return flags
      },
      addChangedTerm (term) {
        let idx = this.modified.findIndex(o => term.id === o.id)
        this.$nextTick(() => {
          let payLoad = {id: term.id, privacy: term.privacy, privacyFlags: this.allFlags(term.privacy)}

          if (idx < 0) {
            this.modified.push(payLoad)
          } else {
            this.modified[idx] = payLoad
          }
        })
      },
      ...mapActions(module, ['saveAllTerms', 'loadRecordList']),
      termName (term) {
        let termId = 0
        if (term.privacy && term.privacy.termId) {
          termId = term.privacy.termId
        } else {
          termId = term.termId
        }

        if (this.termsMap[termId]) {
          return this.termsMap[termId].name
        }

        return 'Informativa generica'
      }
    },
    props: {
      allowAll: {default: false},
      showSmartBar: {default: true},
      multiPrivacy: {default: true},
      readOnly: {default: false}
    },
    data () {
      return {
        dataEdit: false,
        modified: []
      }
    },
    components: {
      SmallEditSaveButtonBar
    },
    created () {
      if (this.readOnly) {
        this.dataEdit = false
      } else if (!this.showSmartBar) {
        this.dataEdit = true
      }
    },
    computed: {
      ...mapGetters('terms', ['termsMap']),
      ...mapState(module, ['recordList']),
      ...mapState('route', ['params'])
    }
  }
</script>

<style lang="scss">
    $checkbox-size: 16px;
    $table-border:1px solid silver;
    .bigger-check {
        position: relative;
        top:3px;
        width: $checkbox-size; /*Desired width*/
        height: $checkbox-size; /*Desired height*/
    }
    .owner-user-form-terms-data-table{
        padding: 0;
        background: transparent;
        width:100%;
        border:$table-border;
        border-spacing: 0px;
        border-collapse: collapse;
        th {
            text-transform: uppercase;
        }
        td,th {
            background: white;
            padding: 3px 3px 3px 5px;
            border-spacing: 0px;
            border:$table-border;
            text-align: left;
            vertical-align: baseline;
        }
        .owner-user-form-terms-data-table-privacy-name{
        }
    }
</style>
