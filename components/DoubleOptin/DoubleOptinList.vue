<template>
    <v-container row class="terms-list pa-0" fluid>
        <list-bar
                to="/owners/terms/add"
                title="Term Managements"
                sub-title="Terms list"
                color="orange darken-1"
                caption="Create New Term"
        />

        <v-data-table
                :headers="headers"
                :items="list"
                hide-actions
                class="elevation-1"
                :no-data-text="$t('Nessun layout')"
        >
            <template slot="items" slot-scope="{item}">
                <td>{{ item.domain }}</td>
                <td>{{ $t(item.status) }}</td>

                <td class="justify-center layout px-0">


                    <v-tooltip top>
                        <v-btn  @click="$router.push('/owners/terms/'+ item.uid)" :disabled="!canSave" slot="activator" flat icon color="blue">
                            <v-icon>edit</v-icon>
                        </v-btn>
                        <span>
                           {{$t('Edit')}}
                        </span>
                    </v-tooltip>


                </td>
            </template>
        </v-data-table>
    </v-container>
</template>
<script>
  import {mapState, mapActions} from 'vuex'

  export default {
    data () {
      const headers = [
        {text: this.$t('Domain'), value: 'domain'},
        {text: this.$t('Term'), value: 'term'},
        {text: this.$t('Default'), value: 'default'},
        {text: this.$t('Actions'), value: 'action'}
      ]
      return {
        headers
      }
    },
    methods: {
      ...mapActions('owners/layouts', ['save'])
    },
    computed: {
      ...mapState('owners/domains/list', {'domainList': 'list'}),
      ...mapState('owners/layouts/list', {'layoutsList': 'list'}),
      ...mapState('terms/list', {'termsList': 'list'})
    }
  }
</script>
