<template>
    <v-layout align-center justify-center class="login">
        <v-flex xs12 sm8 md4>
            <v-card class="elevation-3">
                <v-card-text>
                    <v-form>
                        <v-text-field box @change="onChangeUsername" prepend-icon="person" v-model="username" label="Login" type="text" />
                        <v-text-field box  prepend-icon="lock" @keyup.enter="login" v-model="password" label="Password" id="password" type="password" />
                        <v-select v-model="ente" box prepend-icon="location_city" label="Ente" :items="entiList" item-text="descente" item-value="id_ente"/>
                    </v-form>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn :loading="loading" :disabled="!canLogin" color="info" @click="login" @keyup.enter="login" small>
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
  // import {notifyError} from '../../storeimp/api/actions'

  export default {
    layout: 'empty',
    computed: {
      ...mapState('app', ['title']),
      ...mapState('api', ['isAjax']),
      ...mapState('auth', {entiList: 'enti'}),
      canLogin () {
        if (!this.ente) {
          return false
        }
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
        ente: null,
        username: '',
        password: '',
        alert: null,
        unverified: false,
        showReset: false,
        loading: false
      }
    },
    methods: {
      ...mapActions('auth', ['loadEnti', 'doLogin']),
      ...mapMutations('auth', ['resetEnti']),
      onChangeUsername () {
        if (!this.username || this.username === '') {
          this.ente = null
          this.resetEnti()
        } else {
          this.loadEnti(this.username)
        }
      },
      async login () {
        if (!this.canLogin) {
          return
        }
        this.doLogin(this)
        // this.$store.commit('api/notification', notifyError(e, this.$t), {root: true})
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
