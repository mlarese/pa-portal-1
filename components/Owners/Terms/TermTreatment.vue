<template>
    <v-card class="pa-2 term-treatment">
        <v-container  grid-list-md>
            <v-layout row wrap>
                <v-flex xs12 sm3>
                    <v-select :items="list" item-text="name" item-value="code" v-model="item.name" :label="$t('Treatment')" />
                </v-flex>
                <v-flex xs12 sm4>
                    <v-text-field  multi-line box v-model="text[ui.tabLanguage]" :label="$t('Text')"></v-text-field>
                </v-flex>
                <v-flex xs5 sm2 class="pl-4">
                    <label class="switch-label">{{$t('Mandatory')}}</label>

                    <v-switch
                            class="text-xs-center"
                            :label="item.mandatory?$t('Yes'):$t('Not')"
                            v-model="item.mandatory"
                            red
                    ></v-switch>

                </v-flex>

                <v-flex xs5 sm2 class="pl-4">
                    <label class="switch-label">{{$t('Restrictive')}}</label>

                    <div class="text-xs-center">
                        <v-switch

                                :label="item.restrictive?$t('Yes'):$t('Not')"
                                v-model="item.restrictive"
                                red
                        ></v-switch>
                    </div>


                </v-flex>

                <v-flex xs2 sm1>
                    <cancel-btn
                            @click="onRemoveTreatment(index)"
                    />
                </v-flex>

            </v-layout>
        </v-container>
    </v-card>
</template>

<script>
  import {mapState, mapMutations} from 'vuex'
  import CancelBtn from '../../General/CancelBtn'
  export default {
    name: 'TermTreatment',
    props: ['index', 'paraindex'],
    components: {
      CancelBtn
    },
    methods: {
      ...mapMutations('terms', ['updateTreatmentText']),
      onRemoveTreatment (index) {
        if (!confirm(this.$t('Do you confirm?'))) {
          return
        }
        this.paragraph.treatments.splice(index, 1)
      }
    },
    computed: {
      ...mapState('treatments', ['list']),
      ...mapState('terms', ['ui', '$record']),
      language () {
        return this.ui.tabLanguage
      },
      paragraph () {
        return this.$record.paragraphs[this.paraindex]
      },
      item: {
        get () {
          return this.paragraph.treatments[this.index]
        }
      },
      text: {
        get () {
          return this.item.text
        }
      }
    }
  }
</script>

<style lang="scss">
    .term-treatment {
        .input-group {
            padding: 0px 0 0;
        }
        .theme--light .input-group--text-field.input-group--text-field-box .input-group__input, .application .theme--light.input-group--text-field.input-group--text-field-box .input-group__input {
            background: white !important;
        }
        .input-group--text-field-box:not(.input-group--textarea).input-group--multi-line label {
            top: 0px;
        }
        .switch-label {
            font-size:12px;
        }
        .input-group--multi-line {
            .input-group__input {
                background: white !important;
            }
        }

    }

</style>
