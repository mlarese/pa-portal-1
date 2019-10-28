<template>
    <v-dialog v-model="show" persistent max-width="290">
        <v-toolbar dense color="blue" dark >
            <v-toolbar-title class="subheading">
                <v-icon>alternate_email</v-icon>
                {{$t('Share list')}} - {{$t(adapter)}}
            </v-toolbar-title>
        </v-toolbar>
        <v-card class="pa-3">
            <v-layout row wrap>
                <v-flex xs12>
                    <v-form enctype="text/plain" ref="exportform" target="_blank" method="POST">
                        <v-text-field
                                :disabled="!canSave"
                                prepend-icon="description"
                                :label="$t('List name')"
                                box
                                v-model="contactlistName"
                        />
                        <input type="hidden" v-model="jsonParams" name="json"/>
                        <!-- input type="hidden" v-model="_result_" name="_result_" v-if="sendData"/ -->
                    </v-form>
                </v-flex>
            </v-layout>

            <v-card-actions>
                <a v-show="false"></a>
                <v-spacer></v-spacer>
                <v-btn class="elevation-1"  @click.native="onCancel">{{$t('Cancel')}}</v-btn>
                <v-btn class="elevation-1" :disabled="!contactlistName || !canSave" @click.native="onExport">
                    <v-icon>cloud_download</v-icon>
                    <span class="ml-2">{{$t('Share')}}</span>
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
  import {mapActions, mapState, mapGetters} from 'vuex'
  import format from 'date-fns/format'
  import Cookies from 'js-cookie'
  import {getSchema} from '../../../assets/helpers'
  import Vue from 'vue'
  import _values from 'lodash/values'
  import _delay from 'lodash/delay'

  export default {
    name: 'ShareListDialog',
    watch: {
      show () {
        this.contactlistName = this.contactlistFileName
      }
    },
    computed: {
      ...mapState('owners/users', ['exportFilter']),
      contactlistFileName () {
        const date = format(new Date(), 'yyyyMMddTHHmmss')
        let extension = '.csv'
        if (this.adapter === 'mailone') {
          extension = ''
        } else if (this.adapter === 'mailup') {
          extension = ''
        }
        return `${this.adapter}-${date}${extension}`
      },
      ...mapGetters('auth', ['canSave'])
    },
    methods: {
      ...mapActions('owners/users', ['prepareExportList']),
      onCancel () {
        this.$emit('cancel')
      },
      onExport () {
        if (this.adapter === 'csv') {
          this.onExportCsv()
        } else if (this.adapter === 'mailone') {
          this.onExportMailOne()
        } else if (this.adapter === 'mailup') {
          this.onExportMailUp()
        }
      },
      completeExportRequest () {
        this.exportFilter.treatments = _values(this.exportFilter.treatments).filter(o => o.selected)

        let pa = {
          adapter: this.adapter,
          contactlistname: this.contactlistName,
          contactlistemail: '',
          contactlistreplytoemail: '',
          filter: this.exportFilter
        }

        return pa
      },
      onExportMailUp () {
        let pa = this.completeExportRequest()

        this.prepareExportList(pa)
          .then(res => {
            // create list
            if (this.sendData) {
              res.data.filters['_result_'] = this.payLoad
            }
            this.$store.dispatch('api/post', res, {root: true})
              .then(() => {
                // alert(this.$t('Done'))
                // _delay(this.onCancel, 10)
              })
            _delay(this.onCancel, 10)
          })
      },
      onExportMailOne () {
        let pa = this.completeExportRequest()

        this.prepareExportList(pa)
          .then(res => {
            if (this.sendData) {
              res.data.filters['_result_'] = this.payLoad
            }
            // create list
            this.$store.dispatch('api/post', res, {root: true})
              .then(() => {
                // alert(this.$t('Done'))
                // _delay(this.onCancel, 10)
              })
            _delay(this.onCancel, 10)
          })
      },
      onExportCsv () {
        let token = this.$auth.getToken(getSchema())
        let atoken = token.split('bearer ')

        if (atoken.length > 0) {
          token = atoken[1]
        } else {
          alert(this.$t('Error'))
          return
        }
        Cookies.set('token', token)
        let pa = this.completeExportRequest()

        this.prepareExportList(pa)
          .then(res => {
            this.jsonParams = JSON.stringify(res.data)

            if (this.sendData) {
              this._result_ = JSON.stringify(this.payLoad)
            }
            this.$refs.exportform.$el.action = res.url
            Vue.nextTick(() => {
              this.$refs.exportform.$el.submit()
              console.log(this.jsonParams)
              this.onCancel()
            })
          })
      }
    },
    mounted () {
      this.contactlistName = this.exportFileName
    },
    data () {
      const ret = {
        jsonParams: null,
        _result_: null,
        contactlistName: ''
      }
      return ret
    },
    props: {
      sendData: {default: false},
      payLoad: {default: () => []},
      show: {default: false},
      adapter: {default: 'csv'}
    }
  }
</script>
