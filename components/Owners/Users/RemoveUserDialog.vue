<template>
    <v-dialog v-model="show" persistent max-width="450">
        <v-toolbar dense color="blue" dark >
            <v-toolbar-title class="subheading">
                {{$t('Remove user')}} {{email}}
            </v-toolbar-title>
        </v-toolbar>
        <v-card class="pa-3">
            <v-layout row wrap>
                <v-flex xs12>
                    <v-form enctype="text/plain" ref="exportform" target="_blank" method="POST">
                        <v-text-field
                            v-model="checkEmail"
                            :label="$t('Security check - Input user email')"
                            box
                        />
                        <v-alert  type="error" :value="true">
                            {{$t('You will delete all the subscriptions')}}
                        </v-alert>
                    </v-form>
                </v-flex>
            </v-layout>

            <v-card-actions>
                <a v-show="false"></a>
                <v-spacer></v-spacer>
                <v-btn class="elevation-1"  @click.native="onCancel">{{$t('Cancel')}}</v-btn>
                <v-btn class="elevation-1" :disabled="!canCancel" @click.native="onCancel">
                    <v-icon>delete</v-icon>
                    <span class="ml-2">{{$t(`Remove user`)}}</span>
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script>
  export default {
    name: 'RemoveUserDialog',
    methods: {
      onCancel () {
        this.checkEmail = ''
        this.$emit('cancel')
      }
    },
    computed: {
      canCancel () {
        return this.email === this.checkEmail
      }
    },
    data () {
      return {
        checkEmail: ''
      }
    },
    props: {
      show: {default: false},
      email: {type: String}
    }
  }
</script>
