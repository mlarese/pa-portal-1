<template>
    <v-layout align-center justify-center class="login">
        <ResetPassword
                :show="showReset"
                @on-cancel="showReset=false"
                @reset-password="onResetPassword"
        />
        <v-flex xs12 sm8 md4>
            <v-card class="elevation-3">
                <v-card-text>
                    <data-one-icon style="width: 230px; text-align: center; margin:auto; padding-top:5px;"  />

                    <v-form>
                        <v-text-field box prepend-icon="person" v-model="username" label="Login" type="text"></v-text-field>
                        <v-text-field box  prepend-icon="lock" @keyup.enter="login" v-model="password" label="Password" id="password" type="password"></v-text-field>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-btn @click="showReset=true" flat>{{$t('Password reset')}}</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn  :loading="loading" :disabled="!canLogin" color="info" @click="login" @keyup.enter="login" small>
                        Login
                        <v-icon right>input</v-icon>
                    </v-btn>

                </v-card-actions>
            </v-card>
        </v-flex>
    </v-layout>

</template>
<script>
  import VueRecaptcha from 'vue-recaptcha'
  import ResetPassword from '../../components/General/ResetPassword'
  import {mapState, mapActions} from 'vuex'
  import {notifyError} from '../../storeimp/api/actions'
  import {getSchema} from '../../assets/helpers'
  export default {
    layout: 'empty',
    components: {VueRecaptcha, ResetPassword},
    computed: {
      ...mapState('app', ['title']),
      ...mapState('api', ['isAjax']),
      canLogin () {
        if (!this.username) {
          return false
        }
        if (!this.password) {
          return false
        }

        return true
      }
    },
    mounted () {
      // debugger // eslint-disable-line
      // console.log('debug')
    },
    data () {
      return {
        error: null,
        username: '',
        password: '',
        alert: null,
        unverified: false,
        showReset: false,
        loading: false
      }
    },
    methods: {
      ...mapActions('auth', ['passwordReset']),
      onResetPassword (user) {
        this.showReset = false
        this.$notify({
          type: 'success',
          text: this.$t('You will receive an email shortly')
        })
        return this.passwordReset(user)
      },
      async login () {
        if (!this.canLogin) {
          return
        }
        this.error = null
        let schema = getSchema()
        this.loading = true
        return this.$auth
          .loginWith(schema, {
            data: {
              username: this.username,
              password: this.password
            }
          })
          .then(() => {
            this.loading = false
            return this.$router.push('/')
          })
          .catch(e => {
            this.loading = false
            this.error = e + ''
            this.$store.commit('api/notification', notifyError(e, this.$t), {root: true})
          })
      }
    }
  }
</script>
<style lang="scss">
    .login {
        .icon {
            align-items: center;
            display: inline-flex;
            font-size: 20px !important;
            vertical-align: bottom;
        }

        .input-group--text-field input {
            height: 40px !important ;
        }
    }
</style>
