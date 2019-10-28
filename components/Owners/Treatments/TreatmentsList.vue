<template>
    <v-container row  class="treatments-list pa-0" fluid>
            <list-bar
            to="/owners/treatments/add"
            title="Treatment Managements"
            sub-title="Treatment list"
            color="orange darken-1"
            caption="Create New Treatment"
            />
                    <v-data-table
                        :headers="headers"
                        :items="list"
                        :hide-actions="true"
                        class="elevation-1"
                        :no-data-text="$t('No treatments')"
                    >

                        <template slot="items" slot-scope="{item}">
                            <td>{{ item.code }}</td>
                            <td>{{ item.name }}</td>
                            <td>{{ item.note }}</td>
                            <td>{{ item.creator.userName}}</td>
                            <td>{{ item.created | dmy }}</td>
                            <td nowrap="nowrap">

                                <v-btn @click="$router.push('/owners/treatments/'+ item.code)" :disabled="!canSave" flat icon color="blue">
                                    <v-icon>edit</v-icon>
                                </v-btn>

                                <v-btn :disabled="!canSave" flat icon color="red" v-if="false">
                                    <v-icon>delete</v-icon>
                                </v-btn>
                            </td>
                        </template>
                    </v-data-table>
        </v-container>
</template>
<script>
  import {mapState, mapGetters} from 'vuex'
  import {dmy} from 'assets/filters'
  import ListBar from '../../General/ListBar'
  export default {
    filters: {dmy},
    data () {
      const headers = [
        { text: this.$t('Code'), value: 'code' },
        { text: this.$t('Name'), value: 'name' },
        { text: this.$t('Note'), value: 'note' },
        { text: this.$t('Creator'), value: 'creator' },
        { text: this.$t('Created'), value: 'created' },
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
      ...mapState('treatments', ['list']),
      ...mapGetters('auth', ['canSave'])
    }
  }
</script>

