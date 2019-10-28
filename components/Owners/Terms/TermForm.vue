<template>
    <v-container fluid grid-list-lg>
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

                    <v-flex xs8 mb-1>
                        <language-tab/>
                    </v-flex>
                </v-layout>

                <v-form v-model="form.valid">
                    <v-layout row>
                        <v-flex xs12>
                            <v-text-field
                                    :disabled="!canSave"
                                    :label="$t('Term name')"
                                    required
                                    box
                                    v-model="$record.name"
                            >

                            </v-text-field>
                        </v-flex>
                    </v-layout>
                </v-form>

                <template v-for="(p, i) in paragraphs">
                    <v-card class="mb-2">
                        <v-toolbar class="elevation-2" color="light-blue darken-2" dark dense>
                                <v-toolbar-title>
                                    {{$t('Paragraph')}} {{i+1}}

                                </v-toolbar-title>
                                <v-spacer></v-spacer>
                                <cancel-btn  v-if="i > 0" @click="removeParagraph(i)"  color="whitw" :disabled="!canSave"/>

                        </v-toolbar>
                        <v-flex xs12>
                            <term-title :index="i" :key="i"/>
                        </v-flex>

                        <v-flex xs12 mb-2>
                            <h4 v-text="$t('Paragraph text')"></h4>
                            <term-editor :index="i" :key="i"/>
                        </v-flex>

                        <v-flex xs12>
                            <term-treatments :paragraph="p" :index="i" />
                        </v-flex>
                    </v-card>
                </template>

                <v-layout >
                    <v-flex>
                        <add-btn
                                :disabled="!canSave"
                                add="Add paragraph"
                                @click="addParagraph(index)"
                        />
                    </v-flex>
                </v-layout>

                <v-layout>
                    <pages :pages="$record.pages"/>
                </v-layout>
            </v-flex>

            <v-navigation-drawer
                    fixed
                    :clipped="true"
                    app
                    v-model="ui.drawerRight"
                    :width="250"
                    right
                    class="form-term-right-drawer"
            >

                <v-layout row>
                    <v-flex xs12>
                        <v-card class="px-2 mb-2" flat>
                            <v-flex xs12>
                                <terms-info :record="$record" />
                            </v-flex>

                            <v-flex xs12 class="text-xs-center" >
                                <v-tooltip bottom>
                                    <v-btn slot="activator" dark fab class="elevation-0" small color="green darken-3" @click="onSave" :disabled="!canSave">
                                        <v-icon>save</v-icon>
                                    </v-btn>
                                    <span>{{$t('Save changes')}}</span>
                                </v-tooltip>

                                <v-tooltip bottom v-if="isEditMode && isPublished && !statusChanged">
                                    <v-speed-dial>
                                        <v-btn  slot="activator"  fab dark class="elevation-0" small color="orange darken-1" @click="onSuspend" :disabled="!canSave">
                                            <v-icon>pause</v-icon>
                                        </v-btn>
                                        <v-btn>ok</v-btn>
                                    </v-speed-dial>
                                    <span>{{$t('Suspend')}}</span>
                                </v-tooltip>

                                <v-tooltip bottom v-if="isEditMode && !isPublished && !statusChanged">
                                    <v-btn dark slot="activator"  fab class="elevation-0" small color="orange darken-1" @click="onPublish" :disabled="!canSave">
                                        <v-icon>publish</v-icon>
                                    </v-btn>
                                    <span>{{$t('Publish')}}</span>
                                </v-tooltip>


                            </v-flex>

                        </v-card>

                        <v-flex xs12 class="text-xs-center">
                            <v-tooltip left>
                                <v-btn slot="activator"  fab color="light-blue accent-4" dark  @click="showConfigureDialog=true" :disabled="!canSave">
                                    <v-icon>widgets</v-icon>

                                </v-btn>
                                <span>
                                        {{$t('Widget')}}
                                </span>
                            </v-tooltip>
                        </v-flex>

                        <v-flex xs12 class="text-xs-center" v-if="$record.options">
                            <terms-history :history="$record.options.history" />
                        </v-flex>

                    </v-flex>

                </v-layout>
            </v-navigation-drawer>

            <ConfigureWidgetDialog :term="$record" :show="showConfigureDialog" @cancel="showConfigureDialog=false"/>
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
  import TermEditor from './TermEditor'
  import TermTitle from './TermTitle'
  import TermsButton from './TermsButton'
  import TermTreatments from './TermTreatments'
  import Pages from './Pages'
  import TermsHistory from './TermsHistory'
  import TermsInfo from './TermsInfo'
  import AddBtn from '../../General/AddBtn'
  import {mapState, mapActions, mapGetters, mapMutations} from 'vuex'
  import CancelBtn from '../../General/CancelBtn'
  import BackToTop from 'vue-backtotop'
  import ConfigureWidgetDialog from './ConfigureWidgetDialog'

  export default {
    name: 'TermForm',
    components: {
      LanguageTab,
      TermEditor,
      TermsButton,
      TermTitle,
      TermTreatments,
      TermsInfo,
      TermsHistory,
      AddBtn,
      CancelBtn,
      Pages,
      BackToTop,
      ConfigureWidgetDialog
    },
    methods: {
      ...mapActions('terms', ['save']),
      ...mapMutations('terms', ['addHistory']),
      ...mapMutations('app', ['setBurgerRight', 'setDrawerRight']),
      scrollTop () {
        window.scrollTo({top: 0, behavior: 'smooth'})
      },
      addParagraph () {
        if (!confirm(this.$t('Do you confirm?'))) {
          return
        }
        this.paragraphs.push({title: '', text: {it: ''}, treatments: []})
      },
      removeParagraph (index) {
        if (!confirm(this.$t('Do you confirm?'))) {
          return
        }
        this.paragraphs.splice(index, 1)
      },
      onPublish () {
        if (!confirm(this.$t('Do you confirm?'))) {
          return
        }

        this.addHistory({action: 'publication', date: new Date(), user: this.user, description: ''})
        this.statusChanged = true
        this.$record.status = 'published'
      },
      onSuspend () {
        if (!confirm(this.$t('Do you confirm?'))) {
          return
        }

        this.addHistory({action: 'suspension', date: new Date(), user: this.user, description: ''})
        this.statusChanged = true
        this.$record.status = 'suspended'
      },
      onSave () {
        if (this.termIsDirty) {
          this.addHistory({action: 'Term changes update', date: new Date(), user: this.user, description: ''})
        }

        this.$nextTick(this.$nuxt.$loading.start)
        this.save({data: this.$record, id: this.$record.uid})
          .then(r => {
            this.$router.push('/owners/terms')
            return r
          })
          .catch(() => { this.setFormSaving(false) })
          .then(() => this.$nextTick(this.$nuxt.$loading.start))
      }
    },
    watch: {
      '$record.name' () {
        this.termIsDirty = true
      },
      '$record.paragraphs': {
        deep: true,
        handler () {
          this.termIsDirty = true
        }
      }
    },
    props: {
      to: {default: '/owners/terms'}
    },
    data () {
      return {
        statusChanged: false,
        termIsDirty: false,
        showConfigureDialog: false
      }
    },
    created () {
      if (!this.$record.options) {
        this.$record.options = {}
      }
      this.setBurgerRight(true)
      this.setDrawerRight(true)
    },
    computed: {
      ...mapState('terms', ['ui', '$record', 'form']),
      ...mapGetters('terms', ['isEditMode']),
      ...mapState('auth', ['user']),
      ...mapGetters('auth', ['canSave']),
      ...mapState('app', ['ui']),
      isPublished () {
        return this.$record.status === 'published'
      },
      isSuspended () {
        return this.$record.status === 'published'
      },
      title: {
        get () {
          return this.$store.state.terms.$record.paragraphs[this.index].title[this.ui.tabLanguage]
        },
        set (value) {
          const language = this.ui.tabLanguage
          const {index} = this
          this.$store.dispatch('terms/updateTitle', {value, index, language})
        }
      },
      paragraphs () {
        return this.$record.paragraphs
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
