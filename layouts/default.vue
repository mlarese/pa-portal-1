<template>
  <v-app>


    <notifications position="top right" />
    <v-navigation-drawer
            fixed
            color="red"
            clipped
            app
            v-model="drawer"
            :width="450"
          >


        <v-list dense>
            <v-list-tile @click="" v-for="(item, index) in menu" :key="index">
                <v-list-tile-action>
                    <v-icon medium>arrow_right</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title style="font-size:16px">{{item.descr_modulo}}</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
        </v-list>

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
          </v-flex>


          <v-flex sm4 class="text-xs-center mt-1"> <span class="headline"><b>{{user.descente}}</b></span></v-flex>

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

      <v-container fluid class="pa-2"  >
        <nuxt />
      </v-container>
    </v-content>

  </v-app>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    watch: {
      'notification.id' (val) {
        this.$notify(this.notification)
      }
    },
    computed: {
      ...mapState('app', ['ui', 'title', 'logo']),
      ...mapState('auth', ['user', 'menu'])
    },
    methods: {
      onLogOut () {
        this.$auth.logout()
        this.$router.push('/login')
      }
    },
    data: () => ({
      dialog: false,
      drawer: null
    })
  }
</script>

<style>
  .input-group--select .input-group__input {
    padding: 12px !important;
  }
  .navigation-drawer {
      background: #f2f2f2 !important;
  }
  .content--wrap{
      filter: blur(2px); -webkit-filter: blur(2px);
      background: url(../assets/img/comune_conegliano.jpg)  center center;
      background-repeat: no-repeat;
      background-size: 300x ;
  }
</style>
