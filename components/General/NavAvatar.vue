<template>
    <v-layout row wrap>
        <data-one-icon style="width: 190px; margin:auto;padding-top:12px" />


        <v-flex class="text-xs-center" xs12 pa-4 >
            <v-avatar size="52px" class="grey lighten-2">
                <img class="img-circle elevation-0" :src="image" >

            </v-avatar>

            <div v-if="$auth.loggedIn">

                <div class="mt-3 caption">{{ $auth.user.user }} <connection-indicator /></div>
                <div class="caption">{{ $auth.user.userName }}</div>
                <v-btn small flat @click="onLogOut">
                    <v-icon small class="mr-1">exit_to_app</v-icon> {{ $t('Logout') }}
                </v-btn>

            </div>
        </v-flex>

    </v-layout>
</template>
<script>
  import ConnectionIndicator from './ConnectionIndicator'

  export default {
    name: 'NavAvatar',
    components: {
      ConnectionIndicator
    },
    methods: {
      onLogOut () {
        this.$auth.logout()
          .then(() => {
            window.location = this.$router.options.base
          })
      }
    },
    computed: {
      image () {
        if (process.env.NODE_ENV === 'development') {
          return '/img/avatar.png'
        } else {
          return '/manager/img/avatar.png'
        }
      }
    }
  }
</script>
