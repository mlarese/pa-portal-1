<template>
    <v-dialog class="configure-widget-dialog" v-model="show" persistent max-width="790">
        <v-toolbar dense color="blue" dark>
            <v-toolbar-title class="subheading">
               <v-icon>widgets</v-icon> {{$t('Widget')}}
            </v-toolbar-title>
        </v-toolbar>
        <v-card class="pa-3">
            <v-layout row wrap class="mb-3">
                <v-flex xs12>
                    <div class="title">
                        {{$t('Widget auto configured')}}

                        <v-tooltip top>
                            <v-btn slot="activator" dark icon small class="light-blue accent-4"   v-clipboard="widgetSimple">
                                <v-icon small>event_note</v-icon>
                            </v-btn>
                            <span>
                                {{$t('Copy')}}
                            </span>
                        </v-tooltip>

                    </div>
                    <v-text-field
                            textarea
                            full-width
                            v-model="widgetSimple"
                            :disabled="true"
                                  solo
                                  class="elevation-1 widget-textarea"
                                  rows="6"

                                  :label="$t('Widget auto configured')"
                    />

                </v-flex>



            </v-layout>


            <v-layout row wrap>
                <v-flex xs12>
                    <div class="title">
                        {{$t('Widget for this term')}}

                        <v-tooltip top>
                            <v-btn slot="activator" dark icon small class="light-blue accent-4"  v-clipboard="widgetByTerm">
                                <v-icon small>event_note</v-icon>
                            </v-btn>
                            <span>
                                {{$t('Copy')}}
                            </span>
                        </v-tooltip>


                    </div>
                    <v-text-field
                                  textarea
                                  full-width
                                  v-model="widgetByTerm"
                                  :disabled="true"
                                  solo
                                  class="elevation-1 widget-textarea"
                                  rows="6"
                    />
                </v-flex>
            </v-layout>


            <v-layout class="text-xs-center mt-2">
                <v-flex>
                    <v-btn class="elevation-1"
                           @click.native="onCancel">{{$t('Close')}}
                    </v-btn>
                </v-flex>
            </v-layout>

        </v-card>
    </v-dialog>
</template>
<script>
  export default {
    name: 'ChangePasswordDialog',
    data () {
      return {
        widgetSimple: '',
        widgetByTerm: ''
      }
    },
    created () {
      /* eslint-disable no-useless-escape */
      this.widgetSimple = `
        <div id="mm-prv-wdg"> </div>
        <link href="static.dataone.online/widget/mmprvwidget.css" rel="stylesheet">
        <script>window.prwidget={owner: ${this.$auth.user.ownerId}};<\/script>
        <script type=text/javascript src="static.dataone.online/widget/mmprvwidget.js"><\/script>
      `
      this.widgetByTerm = `
        <div id="mm-prv-wdg"> </div>
        <link href="static.dataone.online/widget/mmprvwidget.css" rel="stylesheet">
        <script>window.prwidget={termId: '${this.term.uid}',owner: ${this.$auth.user.ownerId}};<\/script>
        <script type=text/javascript src="static.dataone.online/widget/mmprvwidget.js"><\/script>
      `
    },
    methods: {
      onConfigure () {
        this.$emit('configure')
      },
      onCancel () {
        this.$emit('cancel')
      },
      onCopyAction (value) {
        alert('value')
      }
    },
    watch: {
      show () {
      }
    },
    props: {
      show: {default: false},
      term: {required: true}
    }
  }
</script>

<style lang="scss" >

    .widget-textarea {

        padding: 0 !important;

        textarea {
            font-size: 12px !important;
        }
    }
</style>