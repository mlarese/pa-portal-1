<template>
    <v-dialog v-model="show" persistent max-width="500">
        <v-toolbar dense color="blue" dark >
            <v-toolbar-title class="subheading">
                <v-icon>insert_drive_file</v-icon>
                {{$t('Add layout')}}
            </v-toolbar-title>
        </v-toolbar>
        <v-card class="pa-3">
            <v-layout row wrap>
                <v-flex xs12>
                    <v-form ref="exportform">
                        <v-text-field
                                prepend-icon="description"
                                :label="$t('Name')"
                                box
                                v-model="code"
                                persistent-hint
                                :hint="$t('Suggerimento: Metti un nome che ti ricordi il dominio che assocerai')"
                        />
                    </v-form>
                </v-flex>
            </v-layout>

            <v-card-actions>
                <a v-show="false"></a>
                <v-spacer></v-spacer>
                <v-btn class="elevation-1"  @click.native="onCancel">{{$t('Cancel')}}</v-btn>
                <v-btn class="elevation-1" :disabled="!code" @click.native="onSave">
                    <v-icon>save</v-icon>
                    <span class="ml-2">{{$t('Add')}}</span>
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
  import {mapGetters, mapActions, mapMutations} from 'vuex'
  const newLayout = (code) => {
    let ret = {}
    ret[code] = {
      'code': code,
      'logo': '',
      'structure': '',
      'text': {
        'it': '',
        'en': '',
        'de': ''
      },
      'subject': {
        'it': '',
        'en': '',
        'de': ''
      },
      'domain': '',
      'termid': ''
    }
    return ret
  }

  export default {
    name: 'NewLayoutDialog',
    watch: {
      show () {
        this.code = ''
      }
    },
    computed: {
      ...mapGetters('auth', ['canSave'])
    },
    methods: {
      ...mapActions('layouts', ['addLayout']),
      ...mapMutations('layouts', ['setCurrentLayout']),
      onCancel () {
        this.code = ''
        this.$emit('on-cancel')
      },
      onSave () {
        const lcode = this.code
        const layout = newLayout(lcode)
        this.code = ''
        return this.addLayout({layout, code: lcode})
          .then(() => this.setCurrentLayout(lcode))
          .then(() => this.$emit('on-close'))
      }
    },
    mounted () {
      this.code = ''
    },
    data () {
      return {
        code: ''
      }
    },
    props: {
      show: {default: false}
    }
  }
</script>
