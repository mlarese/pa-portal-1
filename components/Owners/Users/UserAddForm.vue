<template>
    <v-container row class="user-add-form" grid-list-sm>
        <form-bar :disabled="!form.valid" @on-save="onSaveUser" to="/owners/users" color="orange darken-1" caption="Save user" />
        <v-form v-model="form.valid" ref="form">
            <v-card class="pa-4" >
            <v-layout row class="title">{{$t('User Data')}}</v-layout>
            <v-layout row>
                <v-flex xs2>
                    <v-select
                            :disabled="!canSave"
                            :items="comboLanguages"
                            item-text="label"
                            item-value="id"
                            required
                            :rules="rules.language"
                            v-model="$record.language"
                            :label="$t('Language')"
                    />
                </v-flex>

                <v-flex xs10>
                    <v-select
                            :disabled="!canSave || !$record.language"
                            :label="$t('Term')"
                            item-text="name"
                            item-value="uid"
                            :items="list"
                            required
                            :rules="rules.term"
                            v-model="$record.termId"
                    />
                </v-flex>
            </v-layout>

            <v-layout row>
                <v-flex xs12>
                    <v-alert :value="!$record.termId" type="info">
                        {{$t('Select language and term')}}
                    </v-alert>
                </v-flex>
            </v-layout>

            <div v-show="$record.termId">
                <v-progress-linear :indeterminate="true" color="info" v-if="loadingTerm"></v-progress-linear>

                <template v-for="(p, j) in $record.paragraphs">
                    <template row v-for="(flag, k) in p.treatments" >
                        <v-layout :key="j +'_'+ k" class="ml-2" v-if="!loadingTerm">

                            <v-checkbox v-if="flag.mandatory"
                                    class="pt-2 user-add-form-checkbox"
                                    v-model="flag.selected"
                                    :rules="rules.checkbox"
                                    :label="flag.code +' - ' + flag.text"
                                    :required="flag.mandatory"
                            ></v-checkbox>

                            <v-checkbox v-else
                                    class="pt-2 user-add-form-checkbox"
                                    v-model="flag.selected"
                                    :label="flag.code +' - ' + flag.text"
                                    :required="flag.mandatory"
                            ></v-checkbox>


                        </v-layout>
                    </template>
                </template>

                <v-layout row wrap>
                    <v-flex xs12 sm6>
                        <v-text-field
                                :disabled="!canSave"
                                v-model="$record.name"
                                box
                                :label="$t('Name')"
                                required
                                :rules="rules.name"
                        />
                    </v-flex>
                    <v-flex xs12 sm6>
                        <v-text-field
                                :disabled="!canSave"
                                v-model="$record.surname"
                                box
                                required
                                :rules="rules.surname"
                                :label="$t('Surname')"
                        />
                    </v-flex>
                    <v-flex xs12 sm6>
                        <v-text-field
                                :disabled="!canSave"
                                v-model="$record.email"
                                box
                                :label="$t('Email')"
                                required
                                :rules="rules.email"
                        />
                    </v-flex>
                    <v-flex xs12 sm6>
                        <v-text-field
                                :disabled="!canSave"
                                v-model="$record.telephone"
                                box
                                :label="$t('Telephone')"
                        />
                    </v-flex>
                    <v-flex xs12>
                        <v-select
                                :disabled="!canSave"
                                v-model="$record.domain"
                                item-text="domain"
                                item-value="domain"
                                :items="optionsDomains"
                                required
                                :rules="rules.domain"
                                box
                                :label="$t('Domain')"/>

                    </v-flex>


                    <v-flex xs12 v-if="false">
                        <v-text-field
                                :disabled="!canSave || !formDataEdit"
                                textarea
                                hide-details
                                box
                                :label="$t('Note')" v-model="record.note"/>
                    </v-flex>


                </v-layout>

                <v-layout row wrap align-baseline>
                    <v-flex xs12>

                        <FileAttachmentManager
                                :edit-mode="true"
                                :show-uploader="true"
                                :end-point="apiEndpoint"
                                @after-upload="onAfterUpload"
                                @delete-attachment="onDeleteAttachment"
                                @download-attachment="onDownloadAttachment"
                                :attachements-object="$attachments"
                        ></FileAttachmentManager>

                    </v-flex>

                </v-layout>


            </div>

            </v-card>
        </v-form>


    </v-container>
</template>

<script>
  import {mapState, mapActions, mapGetters, mapMutations} from 'vuex'
  import {sync} from 'vuex-pathify'
  import FormBar from '../../General/FormBar'
  import {formHandler} from '../../../mixins/form'
  import {attachmentsHandler} from '../../../mixins/attachments'
  import {apiEndpoint} from '../../../storeimp/api/endpoint'

  export default {
    mixins: [formHandler('owners/users'), attachmentsHandler('owners/users')],
    components: {
      FormBar
    },
    created () {
      this.apiEndpoint = `${apiEndpoint}/user/attachmentupd/${this.$record.id}`
    },
    watch: {
      '$record.language' (value) {
        this.$nextTick(this.onLangTermChange)
      },
      '$record.termId' (value) {
        this.$nextTick(this.onLangTermChange)
      }
    },
    data () {
      return {
        domains: [],
        apiEndpoint: '',
        loadingTerm: false,
        rules: {
          // domainPages: [v => !!v || this.$t('required')],
          term: [v => !!v || this.$t('required')],
          name: [v => !!v || this.$t('required')],
          language: [v => !!v || this.$t('required')],
          checkbox: [v => v || this.$t('required')],
          domain: [v => !!v || this.$t('required')],
          email: [
            v => !!v || this.$t('required'),
            v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,6})+$/.test(v) || this.$t('E-mail not valid')
          ],
          telephone: [v => !!v || this.$t('required')]
        }
      }
    },
    methods: {
      ...mapActions('terms', ['load', 'loadToSubscribeTerm']),
      ...mapActions('owners/termspages', ['loadByTermId', 'saveUser']),
      ...mapMutations('owners/users', ['removeAttachment', 'blankAttachments', 'addAttachments']),
      ...mapGetters('auth', ['canSave']),
      onAfterUpload (files) {
        this.addAttachments(files)
      },
      onDeleteAttachment (i) {
        if (!confirm(this.$t('Do you confirm?'))) return
        this.removeAttachment(i)
      },
      onSaveUser () {
        const ownerId = this.$auth.user.ownerId
        const domain = this.$record.domain
        let payLoad = {attachments: this.$attachments, paragraphs: this.$record.paragraphs, $record: this.$record, domain, page: '', ownerId}

        this.saveUser(payLoad)
          .then(() => this.$router.push('/owners/users'))
      },
      onLangTermChange () {
        const {termId, language} = this.$record
        if (!termId) {
          return
        }

        this.loadingTerm = true
        const all = [
          this.loadToSubscribeTerm({termId, language})
            .then(res => { this.$record.paragraphs = res }),
          this.loadByTermId(termId)
        ]
        return Promise.all(all)
          .then(() => { this.loadingTerm = false })
          .catch(() => { this.loadingTerm = false })
      }
    },
    computed: {
      privacyUid () {
        return this.$record.id
      },
      ...mapState('terms', ['list']),
      ...mapState('app', ['comboLanguages']),
      ...mapState('owners/termspages', ['pagesList', 'domainsList']),
      ...mapGetters('owners/termspages', ['optionsPages', 'optionsDomains']),
      ...sync('owners/users/addRecord/*'),
      ...mapState('owners/users', ['attachments', '$attachments']),
      $record: sync('owners/users/addRecord')
    }
  }
</script>

<style lang="scss">
    .user-add-form-checkbox label {
        line-height: 38px;
    }
</style>
