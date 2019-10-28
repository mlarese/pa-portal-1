<template>
    <v-container fluid grid-list-lg>
        <NewLayoutDialog
           :show="showNewLayoutDialog"
           @on-close="showNewLayoutDialog=false"
           @on-cancel="showNewLayoutDialog=false"
        />
        <v-layout row>
            <v-flex xs12 class="term-form">
                <v-layout row wrap class="top-bar" mb-3>
                    <v-flex xs4 class="btn-back pt-3">
                        <v-tooltip right>
                            <v-btn  slot="activator" flat small fab :to="to" active-class="">
                                <v-icon>reply</v-icon>
                            </v-btn>
                            <span>{{$t('Back')}}</span>
                        </v-tooltip>
                    </v-flex>
                    <v-spacer></v-spacer>
                    <v-tooltip left>
                        <v-btn @click="onSave" slot="activator" flat fab color="green darken-3">
                            <v-icon>save</v-icon>
                        </v-btn>
                        <span>{{$t('Save')}}</span>
                    </v-tooltip>

                </v-layout>
                <v-form v-model="form.valid">
                    <v-layout row>
                        <v-flex xs8>
                            <v-select
                              :items="layoutList"
                              v-model="layoutUi.currentLayout"
                              :hint="$t('Select current layout')"
                              persistent-hint
                            />
                        </v-flex>
                        <v-flex xs4>
                            <v-tooltip top>
                                <v-btn @click="showNewLayoutDialog=true" slot="activator" fab dark  color="teal lighten-1"  class="mt-3" small>
                                    <v-icon>add</v-icon>
                                </v-btn>
                                {{$t('Add layout')}}
                            </v-tooltip>

                        </v-flex>
                    </v-layout>

                    <v-layout row>
                        <v-flex xs12>
                            <v-text-field hide-details :label="$t('Logo struttura')"  box  v-model="logo" />
                        </v-flex>
                    </v-layout>

                    <v-layout row>
                        <v-flex xs12>
                            <v-text-field hide-details :label="$t('Nome struttura')"  box  v-model="structure" />
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12>
                            <v-select
                                    hide-details
                                    :label="$t('Domain')"
                                    box
                                    v-model="domain"
                                    :items="domainsList"
                                    item-value="name"
                                    item-text="name"
                                    :return-object="false"
                            />
                        </v-flex>
                    </v-layout>

                    <v-layout row>
                        <v-flex xs12>
                            <v-select
                                    hide-details
                                    :label="$t('Term')"
                                    box
                                    v-model="termid"
                                    :items="termsList"
                                    item-value="uid"
                                    item-text="name"
                                    :return-object="false"
                            >
                                <template template slot="item" slot-scope="{item}">
                                    <template>
                                        <v-list-tile-content class="py-2" style="border-bottom: 1px solid #e2e2e2">{{item.name}}</v-list-tile-content>
                                    </template>
                                </template>

                            </v-select>
                        </v-flex>

                    </v-layout>

                </v-form>



                <v-card class="mt-2">
                    <v-layout row class="px-2">
                        <v-flex xs12 mb-1 style="background: white !important;" class="pa-0">
                            <language-tab/>
                        </v-flex>
                    </v-layout>
                    <v-layout row class="px-1">
                        <v-flex xs12>
                            <v-text-field  hide-details :label="$t('Oggetto')"  box  v-model="subject"  />
                        </v-flex>
                    </v-layout>



                    <v-layout row class="px-3">
                     <!-- layout-editor/ -->
                        <v-text-field  hide-details :label="$t('Html')"  box  v-model="text" multi-line rows="20" textarea />
                    </v-layout>
                </v-card>

            </v-flex>


        </v-layout>

        <back-to-top visibleoffset="100" right="35px">
            <v-btn color="pink"  dark  small fixed  fab :disabled="!canSave">
                <v-icon>keyboard_arrow_up</v-icon>
            </v-btn>
        </back-to-top>

    </v-container>
</template>

<script>
  import LanguageTab from './LanguageTab'
  import LayoutEditor from './LayoutEditor'
  import NewLayoutDialog from './NewLayoutDialog'
  import {mapState, mapActions, mapGetters, mapMutations} from 'vuex'
  import BackToTop from 'vue-backtotop'
  import _keys from 'lodash/keys'
  import _reduce from 'lodash/reduce'
  export default {
    name: 'LayoutForm',
    components: {
      LanguageTab,
      LayoutEditor,
      BackToTop,
      NewLayoutDialog
    },
    methods: {
      ...mapActions('layouts', ['save', 'saveby']),
      ...mapMutations('app', ['setBurgerRight', 'setDrawerRight']),
      scrollTop () {
        window.scrollTo({top: 0, behavior: 'smooth'})
      },
      onSave () {
        const id = this.owner.id
        this.saveby({id})
          .then(() => this.$router.push(this.to))
      }
    },
    props: {
      to: {default: '/operators/owners'}
    },
    data () {
      return {
        statusChanged: false,
        termIsDirty: false,
        showNewLayoutDialog: false
      }
    },

    computed: {
      layoutList () {
        return _keys(this.list)
      },
      termsList () {
        return _reduce(this.termsListComplete, (result, value) => {
          let {uid, name} = value
          result.push({uid, name})
          return result
        }, [])
      },
      ...mapState('layouts', {'layoutUi': 'ui'}),
      ...mapState('terms', {'termsListComplete': 'list'}),
      ...mapState('domains', {'domainsList': 'list'}),
      ...mapState('layouts', ['$record', 'form', 'list', 'owner']),
      ...mapGetters('layouts', ['isEditMode']),
      ...mapState('auth', ['user']),
      ...mapGetters('auth', ['canSave']),
      ...mapState('app', ['ui']),
      subject: {
        get () { return this.$store.getters['layouts/getSubject'] },
        set (value) { this.$store.commit('layouts/setSubject', value) }
      },
      code: {
        get () { return this.$store.getters['layouts/getCode'] },
        set (value) { this.$store.commit('layouts/setCode', value) }
      },
      logo: {
        get () { return this.$store.getters['layouts/getLogo'] },
        set (value) { this.$store.commit('layouts/setLogo', value) }
      },
      structure: {
        get () { return this.$store.getters['layouts/getStructure'] },
        set (value) { this.$store.commit('layouts/setStructure', value) }
      },
      termid: {
        get () { return this.$store.getters['layouts/getTermId'] },
        set (value) { this.$store.commit('layouts/setTermId', value) }
      },
      domain: {
        get () { return this.$store.getters['layouts/getDomain'] },
        set (value) { this.$store.commit('layouts/setDomain', value) }
      },
      text: {
        get () { return this.$store.getters['layouts/getText'] },
        set (value) { this.$store.commit('layouts/setText', value) }
      }

    }
  }
</script>

<style lang="scss">
    .term-form {
        .top-bar {
            border-bottom: 1px solid silver;
        }
    }
    .form-term-right-drawer .navigation-drawer__border {
        display:none;
        width: 0;
    }
</style>
