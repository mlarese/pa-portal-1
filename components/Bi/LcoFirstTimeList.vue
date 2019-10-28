<template>
    <v-container row  class="lcon-first-time-list">
        <v-data-table
                :headers="headers"
                :items="list"
                :hide-actions="false"
                class="elevation-1"
        >

            <template slot="items" slot-scope="{item}">
                <td>{{ item.code }}</td>
                <td>{{ item.name }}</td>
                <td>{{ item.lastName}}</td>
                <td>{{ item.dob_age}}</td>
                <td>{{ item.city}}</td>
                <td>{{ item.age}}</td>
                <td>{{ item.sex}}</td>
                <td>{{ item.email}}</td>
            </template>
        </v-data-table>
    </v-container>
</template>
<script>
  import {mapState} from 'vuex'
  export default {
    data () {
      const headers = [
        { text: this.$t('Code'), value: 'code' },
        { text: this.$t('Name'), value: 'name' },
        { text: this.$t('Last Name'), value: 'last lame' },
        { text: this.$t('Dob-Age'), value: 'dob_age' },
        { text: this.$t('City'), value: 'city' },
        { text: this.$t('Age'), value: 'age' },
        { text: this.$t('Sex'), value: 'sex' },
        { text: this.$t('Email'), value: 'email' }
      ]
      return {
        tableTexts: {
          rowsPerPageText: this.$t('Rows per page'),
          rowsPerPageItems: [5, 10, 25, {'text': this.$t('All'), 'value': -1}]
        },
        headers
      }
    },
    components: {
    },
    computed: {
      ...mapState('bi/lcoFirstTime', ['list'])
    }
  }
</script>

le>
