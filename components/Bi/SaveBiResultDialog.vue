<template>
    <v-dialog v-model="show" persistent max-width="500">
        <v-toolbar dense color="blue" dark >
            <v-toolbar-title class="subheading">
                <v-icon>save</v-icon>
                {{$t('Salva query')}}
            </v-toolbar-title>
        </v-toolbar>
        <v-card class="pa-3">
            <v-layout row wrap>
                <v-flex xs12>
                    <v-form ref="exportform">
                        <v-text-field
                                prepend-icon="description"
                                :label="$t('Description')"
                                box
                                v-model="resultName"
                        />
                    </v-form>
                </v-flex>
            </v-layout>

            <v-card-actions>
                <a v-show="false"></a>
                <v-spacer></v-spacer>
                <v-btn class="elevation-1"  @click.native="onCancel">{{$t('Cancel')}}</v-btn>
                <v-btn class="elevation-1" :disabled="!resultName" @click.native="onSave">
                    <v-icon>cloud_download</v-icon>
                    <span class="ml-2">{{$t('Save')}}</span>
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'

  export default {
    watch: {
      show () {
        this.resultName = ''
      }
    },
    computed: {
      ...mapGetters('auth', ['canSave'])
    },
    methods: {
      ...mapActions('bi/qrLastCheckout', ['saveResultList']),
      onCancel () {
        this.resultName = ''
        this.$emit('on-cancel')
      },
      onSave () {
        return this.saveResultList(this.resultName)
          .then(() => { this.resultName = '' })
          .then(() => this.$emit('on-close'))
      }
    },
    mounted () {
      this.resultName = ''
    },
    data () {
      return {
        resultName: ''
      }
    },
    props: {
      show: {default: false}
    }
  }
</script>
