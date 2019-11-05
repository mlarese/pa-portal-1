<template>
  <v-app>
    <notifications position="top right" style="margin-top:50px"/>
    <v-navigation-drawer
            fixed
            :clipped="false"
            app
            v-model="drawer"
            :width="250"
          >
      <role-menu />
    </v-navigation-drawer>

    <v-toolbar
            class="app-tolbar"
            color="grey lighten-2"
            dark
            flat
            dense
            app
            :clipped-left="false"
            fixed
    >
      <v-toolbar-title style="width: 600px" class="ml-0 pl-3">
        <v-toolbar-side-icon class="side-icon" @click.stop="drawer = !drawer"></v-toolbar-side-icon>


      </v-toolbar-title>


      <v-spacer></v-spacer>

      <!-- v-btn icon @click="onLogOut">
        <v-icon>exit_to_app</v-icon>
      </v-btn -->
      <v-toolbar-side-icon v-if="ui.burgerRight"  @click.stop="ui.drawerRight = !ui.drawerRight"></v-toolbar-side-icon>
    </v-toolbar>
    <v-content>

      <v-container fluid class="pa-2" >
        <nuxt />
      </v-container>
    </v-content>

  </v-app>
</template>

<script>
  export default {
    watch: {
      'notification.id' (val) {
        this.$notify(this.notification)
      }
    },
    methods: {
      onLogOut () {
        this.$auth.logout()
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
</style>
