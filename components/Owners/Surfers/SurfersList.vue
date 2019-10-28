<template>
    <v-container row class="owners-list ma-0 pa-0">
        <list-bar
                to="/owners/users/add"
                color="blue lighten-1"
                caption="Create New Privacy"
                title="Management Users"
                sub-title="List of Users"
        />

        <v-toolbar dense class="py-0 px-4  elevation-1" color="white">
            <v-text-field
                    :disabled="!canSave"
                    v-model="search.criteria"
                    append-icon="search"
                    :label="$t('Search')"
                    single-line
                    hide-details
            ></v-text-field>

            <v-tooltip left>
                <v-btn
                        :disabled="!canSave || isAjax"
                        :loading="isAjax"
                        flat
                        slot="activator"
                        small fab @click="onReload"
                >

                    <span slot="loader" class="custom-loader">
                        <v-icon light>cached</v-icon>
                    </span>
                    <v-icon medium>refresh</v-icon>
                </v-btn>
                {{$t('Reload list')}}
            </v-tooltip>
        </v-toolbar>

        <UsersGrid :headers="headers" :on-row-click="onRowClick(p)" :table-texts="tableTexts"/>

    </v-container>
</template>

<script>
  import {mapActions, mapState, mapGetters} from 'vuex'
  import ListBar from '../../General/ListBar'
  import UsersGrid from './UsersGrid'

const module = 'owners/subscriptions'
  export default {
    name: 'OwnersList',
    methods: {
      onReload () {
        this.load({})
      },
      onRowClick (p) {
        p.expanded = !p.expanded
      },
      ...mapActions(module, ['load'])
    },
    components: {
      UsersGrid,
      ListBar
    },
    computed: {
      ...mapState(module, ['list', 'search', 'grid']),
      ...mapState('api', ['isAjax']),
      ...mapGetters('auth', ['canSave'])
    }
  }
</script>

