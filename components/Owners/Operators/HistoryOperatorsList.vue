<template>
    <v-container row class="history-operators-list">
        <v-card class="pa-1 elevation-1">
            <v-layout row><span class="my-3">{{$t('History Operators')}}</span>
            </v-layout>
            <v-data-table
                    :headers="headers"
                    :items="items"
                    hide-actions
                    class="elevation-1"
            >
                <template slot="items" slot-scope="{item}">
                    <td>{{item.id}}</td>
                    <td>{{item.name }}</td>
                    <td>{{ item.surname }}</td>
                    <td>{{ item.email }}</td>
                    <td>{{ item.role }}</td>
                    <td>{{ item.period }}</td>
                    <td class="justify-center layout px-0">
                        <v-btn flat icon class="mx-0">
                            <v-icon color="blue">search</v-icon>
                        </v-btn>
                    </td>
                </template>
            </v-data-table>
        </v-card>
    </v-container>
</template>

<script>
  export default {
    props: {
      item: {
        default: () => ({
          id: '232sw22',
          name: 'Courage',
          surname: 'Asemota',
          email: 'ase@gmail.com',
          role: 'Titolare',
          period: 'Temporaneo'
        })
      }
    },
    components: {
    },
    data () {
      const headers = [
        {text: 'ID', value: 'ID'},
        {text: this.$t('Name'), value: 'Name'},
        {text: this.$t('Surname'), value: 'Surname'},
        {text: this.$t('Email'), value: 'Email'},
        {text: this.$t('Role'), value: 'Role'},
        {text: this.$t('Period'), value: 'Period'},
        {text: this.$t('Actions'), value: 'Actions'}
      ]
      return {
        tableTexts: {
          rowsPerPageText: this.$t('Rows per page'),
          rowsPerPageItems: [5, 10, 25, {'text': this.$t('All'), 'value': -1}]
        },
        headers
      }
    }
  }
</script>

<style>

</style>