<template>
    <v-dialog v-model="show" persistent max-width="390">
        <v-toolbar dense color="blue" dark >
            <v-toolbar-title class="subheading">
                {{$t('Change password')}}
            </v-toolbar-title>
        </v-toolbar>
        <v-card class="pa-3">
            <v-layout row wrap>
                <v-flex xs12>

                    <v-form v-model="formValid">

                        <v-flex>
                            <v-text-field :label="$t('Old password')" box v-model="oldPassword" required :rules="rules.password" type="password"/>
                        </v-flex>


                        <v-flex>
                            <v-text-field :label="$t('New password')" box v-model="password" required :rules="rules.password" type="password"/>
                        </v-flex>

                        <v-flex>
                            <v-text-field :label="$t('Repeat password')" box v-model="repeatPassword" required :rules="rules.password" type="password"/>
                        </v-flex>


                    </v-form>


                </v-flex>
            </v-layout>

            <v-card-actions>
                <a v-show="false"></a>

                <v-spacer></v-spacer>
                <v-btn class="elevation-1"  @click.native="onCancel">{{$t('Cancel')}}</v-btn>
                <v-btn class="elevation-1" :disabled="!canChange" @click.native="onChangePassword">
                    <span class="ml-2">{{$t('Change password')}}</span>
                </v-btn>
            </v-card-actions>

        </v-card>
    </v-dialog>
</template>
<script>
  import {mapActions} from 'vuex'
  export default {
    name: 'ChangePasswordDialog',
    methods: {
      ...mapActions('users', ['changePassword']),
      onChangePassword () {
        this.changePassword({
          userId: this.userId,
          password: this.password,
          repeatPassword: this.repeatPassword,
          oldPassword: this.oldPassword
        })
          .then(() => {
            alert(this.$t('Password Changed'))
            this.onCancel()
          })
      },
      onCancel () {
        this.$emit('cancel')
      }
    },
    watch: {
      show () {
        this.repeatPassword = ''
        this.password = ''
        this.oldPassword = ''
      }
    },
    computed: {
      canChange () {
        return this.formValid && this.passwordMatch
      },
      passwordMatch () {
        return this.password === this.repeatPassword
      }
    },
    data () {
      return {
        rules: {
          password: [
            v => !!v || this.$t('required'),
            v => (v.length >= 8) || this.$t('At least 8 characters')
          ]
        },
        formValid: true,
        password: '',
        oldPassword: '',
        repeatPassword: ''
      }
    },
    props: {
      show: {default: false},
      userId: {required: true}
    }
  }
</script>
