<template>
    <v-layout align-center justify-center class="login">
        <v-flex xs12 sm8 md4>
            <v-card class="elevation-3">
                <v-card-text>
                    <data-one-icon style="width: 230px; text-align: center; margin:auto; padding-top:5px;"  />

                    <v-form>
                        <v-text-field box prepend-icon="person" v-model="username" label="Login" type="text" />
                        <v-text-field box  prepend-icon="lock" @keyup.enter="login" v-model="password" label="Password" id="password" type="password" />
                        <v-select class="pa-2"  box prepend-icon="location_city" label="Ente" :items="entiList"/>
                    </v-form>
                </v-card-text>

                <v-card-actions>
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
  import {mapState, mapActions, mapMutations} from 'vuex'
  import {notifyError} from '../../storeimp/api/actions'
  import {getSchema} from '../../assets/helpers'

  export default {
    layout: 'empty',
    watch: {
      username (val) {
        if (!val || val === '') {
          this.resetEnti()
        } else {
          this.loadEnti(this.username)
        }
      }
    },
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
      ...mapActions('auth', ['loadEnti']),
      ...mapMutations('auth', ['resetEnti']),
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
<style>
    .login .icon {
            align-items: center;
            display: inline-flex;
            font-size: 20px !important;
            vertical-align: bottom;
     }

    .login    .input-group--text-field input {
            height: 40px !important ;
    }

</style>
