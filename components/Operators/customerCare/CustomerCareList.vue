<template>
    <v-container row  class="Customer-care-list">
        <list-bar
                to="/operators/customercare/add"
                title="Customer care operators management"
                sub-title="List Of Operators"
                    color="amber lighten-1"
                caption="Create New Operator"
        />
        <v-data-table
                :headers="headers"
                :items="list"
                :hide-actions="true"
                class="elevation-1"
        >

            <template slot="items" slot-scope="{item}">
                <td>{{ item.name }}</td>
                <td>{{ item.firstName }}</td>
                <td>{{ item.lastName}}</td>
                <td>{{ item.email}}</td>
                <td nowrap="nowrap">
                    <nuxt-link :to="'/operators/customercare/'+ item.id">
                        <v-btn flat icon color="blue">
                            <v-icon>edit</v-icon>
                        </v-btn>
                    </nuxt-link>
                    <v-btn flat icon color="red" v-if="false">
                        <v-icon>delete</v-icon>
                    </v-btn>
                </td>
            </template>
        </v-data-table>
    </v-container>
</template>
<script>
  import {mapState} from 'vuex'
  import ListBar from '../../General/ListBar'
  export default {
    data () {
      const headers = [
        { text: this.$t('Operator'), value: 'name' },
        { text: this.$t('Name'), value: 'firstName' },
        { text: this.$t('Surname'), value: 'lastName' },
        { text: this.$t('Email'), value: 'email' },
        { text: this.$t('Actions'), value: 'action' }
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
      ListBar
    },
    computed: {
      ...mapState('customerCare', ['list'])
    }
  }
</script>

le>
