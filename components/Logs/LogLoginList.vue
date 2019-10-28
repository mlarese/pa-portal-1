<template>
    <v-layout row wrap>
        <v-flex xs12>
            <v-toolbar v-if="title" class="elevation-1" dense>
                <v-toolbar-title>{{$t(title)}}</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-text-field
                        class="log-list-search"
                        v-model="search"
                        append-icon="search"
                        single-line
                        hide-details
                ></v-text-field>

            </v-toolbar>
        </v-flex>
        <v-flex xs12>
            <v-data-table
                    :disable-initial-sort="true"
                    :search="search"
                    :headers="headers"
                    :items="filteredLogs"
                    class="elevation-1 "
                    :no-data-text="$t('Nessun log trovato')"
                    :rows-per-page-items="[5,15,50,75,{text:'$vuetify.dataIterator.rowsPerPageAll',value:-1}]"
            >
                <template slot="items" slot-scope="{item}">
                    <td>{{ item.loginDate|dmy }}</td>
                    <td>{{ item.user }}</td>
                    <td>{{ item.name }}</td>
                    <td>{{ item.ip_address }}</td>
                </template>
            </v-data-table>
        </v-flex>
    </v-layout>
</template>

<script>
  export default {
    name: 'LogLoginList',
    data () {
      const headers = [
        {text: this.$t('Data'), value: 'loginDate'},
        {text: this.$t('Utente'), value: 'user'},
        {text: this.$t('Descrizione'), value: 'name'},
        {text: this.$t('Ip'), value: 'ip_address'}

      ]
      return {
        search: '',
        headers
      }
    },
    computed: {
      filteredLogs () {
        if (!this.type) return this.logs
        return this.logs.filter(o => o.type === this.type)
      }
    },
    props: {
      'logs': {default: () => []},
      'title': {default: null},
      'type': {default: null},
      'loading': {default: false}
    }
  }
</script>

<style scoped>

</style>
