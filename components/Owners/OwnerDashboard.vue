<template>
    <v-container class="pa-0 owner-dashboard" >
        <v-layout row wrap class="mb-3">
            <v-flex xs12 class="pa-1">
                <v-layout column class="mb-3">
                    <v-toolbar class="elevation-1" dark=""  dense color="deep-orange lighten-2">
                        <v-toolbar-title>{{$t('User Requests')}}</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-tooltip top>
                            <v-btn :disabled="!canSave" slot="activator" flat fab small @click="loadRequests">
                                <v-icon small>replay</v-icon>
                            </v-btn>
                            <span v-text="$t('List refresh')"></span>
                        </v-tooltip>
                    </v-toolbar>

                    <!-- UserRequestList  -->
                    <UserRequestList :loading="loadingRequests" />


                </v-layout>

                <v-layout column>
                    <v-toolbar class="elevation-1" dark=""  dense color="light-blue darken-2">
                        <v-toolbar-title>
                            {{$t('Today subscriptions')}}
                        </v-toolbar-title>
                        <v-spacer></v-spacer>

                        <v-tooltip top>
                            <v-btn :disabled="!canSave" slot="activator" flat fab small @click="loadUsers">
                                <v-icon small>replay</v-icon>
                            </v-btn>
                            <span v-text="$t('List refresh')"></span>
                        </v-tooltip>
                    </v-toolbar>

                    <!-- UsersGridSmall  -->
                    <UsersGridSmall :loading="loadingUsers" />

                </v-layout>

            </v-flex>

            <v-flex xs12 md6 class="pa-1">
                <v-toolbar class="elevation-1" color="teal" dark dense>
                    <v-toolbar-title>
                        {{ $t('Active domains')}}
                    </v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-tooltip left>
                        <v-btn :disabled="!canSave" slot="activator" flat fab small @click="loadPages(true)">
                            <v-icon small>replay</v-icon>
                        </v-btn>
                        <span v-text="$t('List refresh')"></span>
                    </v-tooltip>
                </v-toolbar>

                <!-- DomainsAndPages -->
                <DomainsAndPages />
            </v-flex>

        </v-layout>


    </v-container>
</template>
<script>
  import UserRequestList from './UserRequests/UserRequestSmallList'
  import UsersGridSmall from './Users/UsersGridSmall'
  import DomainsAndPages from '../Domains/DomainsAndPages'
  import {mapActions, mapState, mapGetters} from 'vuex'

  export default {
    name: 'OwnerDashboard',
    data () {
      return {
        loadingUsers: false,
        loadingRequests: false
      }
    },
    created () {
      this.loadOpen()
      this.loadUsers()
      this.loadPages()
      this.$nextTick(() => {
        this.$nuxt.$loading.start()
        setTimeout(() => this.$nuxt.$loading.finish(), 300)
      })
    },
    computed: {
      ...mapState('owners/users', ['todayList']),
      ...mapState('owners/termspages', ['list']),
      ...mapGetters('auth', ['canSave'])
    },
    components: {UserRequestList, UsersGridSmall, DomainsAndPages},
    methods: {
      ...mapActions('owners/users', ['searchListToday']),
      ...mapActions('owners/userrequests', ['loadOpen']),
      ...mapActions('owners/termspages', ['load']),
      ...mapActions('terms', {'loadTermsForMap': 'load'}),
      loadUsers () {
        this.loadingUsers = true
        return this.searchListToday()
          .then(() => { this.loadingUsers = false })
      },
      loadRequests () {
        this.loadingRequests = true
        return this.loadOpen()
          .then(() => { this.loadingRequests = false })
      },
      loadPages (force = false) {
        // console.dir(this)
        if (this.list.length === 0 || force) {
          this.loadTermsForMap({})
            .then(() => this.load({}))
        }
      }
    }
  }
</script>

<style lang="scss">
    $toolbar-border-radius:4px 4px 0 0;
    .owner-dashboard {
        .toolbar {
            border-radius: $toolbar-border-radius;
        }
    }
</style>
