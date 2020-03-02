<template>
    <v-layout align-center justify-center class="login">
        <v-flex xs12 sm8 md4>
            <v-toolbar color="light-blue darken-4" dark>
                <v-toolbar-side-icon>
                    <v-icon medium>laptop_windows</v-icon>
                </v-toolbar-side-icon>
                <v-toolbar-title>{{title}}</v-toolbar-title>
            </v-toolbar>
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
  import {mapState, mapActions, mapMutations, mapGetters} from 'vuex'
  // import {notifyError} from '../../storeimp/api/actions'

  export default {
    layout: 'empty',
    watch: {
      isLogged () {

      }
    },
    computed: {
      ...mapState('app', ['title', 'logo']),
      ...mapState('api', ['isAjax']),
      ...mapState('auth', {entiList: 'enti'}),
      ...mapGetters('auth', ['isLogged']),
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
          .then(res => {
            this.$router.push('/')
            console.log('--- route home')
          })
        // this.$store.commit('api/notification', notifyError(e, this.$t), {root: true})
      }
    }
  }
</script>
<style>



</style>
