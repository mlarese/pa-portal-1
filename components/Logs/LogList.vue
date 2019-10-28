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
                    :search="search"
                    :headers="headers"
                    :items="filteredLogs"
                    class="elevation-1 "
                    :loading="loading"
                    :no-data-text="$t('Nessun log trovato')"
            >
                <template slot="items" slot-scope="props">
                    <tr @click="props.expanded = !props.expanded" style="cursor:pointer;" :title="$t('Click per dettaglio')">
                        <td>{{ props.item.date|dmy }}</td>
                        <td>{{ props.item.description }}</td>
                        <td>{{ props.item.user_name }}</td>
                    </tr>
                </template>

                <template slot="expand" slot-scope="props">
                    <v-card flat style="min-height:100px;padding:10px;">
                        <div v-html="toHtml(props.item.history)" ></div>
                    </v-card>
                </template>

            </v-data-table>
        </v-flex>

    </v-layout>
</template>

<script>
  import jsToHtml from 'json-to-html'

  export default {
    name: 'LogList',
    methods: {
      toHtml (json) {
        return '<pre>' + jsToHtml(json, 4) + '<pre>'
      }
    },
    data () {
      const headers = [
        {text: this.$t('Data'), value: 'date'},
        {text: this.$t('Description'), value: 'description'},
        {text: this.$t('Utente'), value: 'user_name'}
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

<style>
    .log-list-search {background: lightyellow;}
    .log-list-search input {
        padding-left:14px; height:25px;margin-top:4px;

    }
</style>
