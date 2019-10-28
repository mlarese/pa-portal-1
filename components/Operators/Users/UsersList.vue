<template>
    <v-container row  class="users-list">
        <list-bar
                to="/operators/users/add"
                title="User Managements"
                sub-title="List Of Users"
                color="yellow"
                caption="Create New Users"
        />
        <v-data-table
                :headers="headers"
                :items="list"
                :hide-actions="true"
                class="elevation-1"
        >

            <template slot="items" slot-scope="{item}">
                <td>{{ item.user }}</td>
                <td>{{ item.name }}</td>
                <td>{{ item.type}}</td>
                <td nowrap="nowrap">
                    <nuxt-link :to="'/operators/users/'+ item.id">
                        <v-btn flat icon color="blue">
                            <v-icon>edit</v-icon>
                        </v-btn>
                    </nuxt-link>
                    <v-btn flat icon color="red">
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
        { text: this.$t('User'), value: 'user' },
        { text: this.$t('Name'), value: 'name' },
        { text: this.$t('Type'), value: 'type' },
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
      ...mapState('operators/users', ['list'])
    }
  }
</script>

