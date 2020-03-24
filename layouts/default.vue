<template>
  <v-app class="default-layout">
    <notifications position="top right" />
    <v-navigation-drawer
            fixed
            color="red"
            clipped
            app
            v-model="drawer"
            :width="450"
          >


        <Menu />

    </v-navigation-drawer>

    <v-toolbar
            class="app-tolbar"
            color="light-blue darken-4"
            dark
            flat
            app
            clipped-left
            fixed
    >

      <v-layout rows wrap>

          <v-flex sm4>

              <v-toolbar-title style="width: 600px" class="ml-0 pl-3">
                <v-toolbar-side-icon class="side-icon" @click.stop="drawer = !drawer"></v-toolbar-side-icon>
                <span>{{title}}</span>

              </v-toolbar-title>

              <!--v-btn @click="onClose">close</v-btn-->
          </v-flex>


          <v-flex sm4 class="text-xs-center mt-1">
              <span class="headline"><b>{{getDescente}}</b></span>
          </v-flex>

          <v-flex sm4 class="text-xs-right">

              <v-btn flat @click="onLogOut" class="py-0 pl-2 pr-0" :fab="$vuetify.breakpoint.xsOnly" :small="$vuetify.breakpoint.xsOnly" v-if="user && user.logged">
                    <v-tooltip left>
                        <span slot="activator" >
                           <div style="font-size:14px">
                            <span style="color:#d1d1d1;">Utente Loggato:</span> <span class="ml-2" style="font-weight: bold;">{{user.descuser}}</span>
                                <v-icon class="ml-1" small>exit_to_app</v-icon>
                           </div>

                        </span>
                        'Logout'
                    </v-tooltip>
              </v-btn>

          </v-flex>
      </v-layout>

    </v-toolbar>
    <v-content>

      <v-container fill-height fluid class="pa-0 ma-0"  >
        <nuxt />
      </v-container>
    </v-content>

  </v-app>
</template>

<script>
  import {mapState, mapMutations, mapGetters} from 'vuex'
  import Menu from '../components/Menu/Menu'
  export default {
    watch: {
      'notification.id' (val) {
        this.$notify(this.notification)
      }
    },
    components: {Menu},
    computed: {
      ...mapState('app', ['ui', 'title', 'logo', 'drawerLeft']),
      ...mapState('auth', ['user', 'menu', 'enti']),
      ...mapGetters('auth', ['getDescente']),
      drawer: {
        get () { return this.ui.drawerLeft },
        set (value) { return this.setDrawerLeft(value) }
      }
    },
    methods: {
      onClose () {
        window.closeSubApp()
      },
      ...mapMutations('app', ['setDrawerLeft']),
      ...mapMutations('auth', ['resetAll']),
      onLogOut () {
        this.$auth.logout()
        this.resetAll()
        this.$router.push('/login')
      }
    },
    data: () => ({
      dialog: false
    })
  }
</script>
