<template>
    <v-container row class="owners-list">
        <list-bar
                to="/operators/owners/add"
                color="blue lighten-1"
                caption="Create New Owner"
                title="Management Owners"
                sub-title="List of active Management Owners"
        />
                <v-toolbar dense class="py-0 px-4  elevation-1" color="white">
                        <v-text-field
                            v-model="search"
                            append-icon="search"
                            :label="$t('Search')"
                            single-line
                            hide-details
                        ></v-text-field>
                </v-toolbar>



        <v-data-table
                :headers="headers"
                :items="list"
                :search="search"
                class="elevation-1"
                v-bind="tableTexts"
        >

            <template slot="items" slot-scope="{item}">
                <td>{{ item.company }}</td>
                <td>{{ item.email }}</td>
                <td class="justify-center layout px-0">
                    <nuxt-link :to="'/operators/owners/'+ item.id + '?mode=edit'">
                        <v-btn flat icon color="blue">
                        <v-icon>edit</v-icon>
                    </v-btn>
                    </nuxt-link>
                    <nuxt-link :to="'/operators/owners/'+ item.id + '?mode=view'" v-if="false">
                        <v-btn icon class="mx-0">
                            <v-icon color="blue">search</v-icon>
                        </v-btn>
                    </nuxt-link>
                    <v-btn flat icon color="red" v-if="false">
                        <v-icon>delete</v-icon>
                    </v-btn>
                </td>
            </template>

            <v-alert slot="no-results" :value="true" color="warning" icon="warning">
                {{$t('No owner found')}}
            </v-alert>

            <template slot="pageText" slot-scope="{ pageStart, pageStop }">
                {{$t('From')}} {{ pageStart }} {{$t('To')}} {{ pageStop }}
            </template>
        </v-data-table>
    </v-container>
</template>

<script>
  import OwnersList from './OwnersList'

  const module = 'owners'
  export default {
    name: 'OwnersListSmall',
    extends: OwnersList,
    data () {
      const headers = [
        { text: this.$t('Company'), value: 'company' },
        { text: this.$t('Email'), value: 'email' },
        { text: this.$t('Actions'), value: 'action' }
      ]
      return {
        tableTexts: {
          rowsPerPageText: this.$t('Rows per page'),
          rowsPerPageItems: [15, 30, 50, {'text': this.$t('All'), 'value': -1}]
        },
        search: '',
        module,
        headers
      }
    }
  }
</script>

<style>

</style>
