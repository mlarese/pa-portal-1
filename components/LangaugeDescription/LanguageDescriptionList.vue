<template>
    <v-container row class="langauge-description-list pa-0" fluid >
        <v-data-table
                :headers="headers"
                :items="list"
                hide-actions
                class="elevation-1"
                :no-data-text="$t('No Language Description')"
        >
            <template slot="items" slot-scope="{item}">
                <td>{{item.code }}</td>
                <td>{{ item.description }}</td>
                <td class="justify-center layout px-0">
                    <nuxt-link :to="'/owners/operators/'+ item.id + '?mode=edit'">
                        <v-btn flat icon color="blue">
                            <v-icon>edit</v-icon>
                        </v-btn>
                    </nuxt-link>
                    <v-btn flat icon color="red" v-if="false">
                        <v-icon>delete</v-icon>
                    </v-btn>
                    <v-btn flat icon color="green" v-if="false">
                        <v-icon>group</v-icon>
                    </v-btn>
                </td>
            </template>
        </v-data-table>
    </v-container>
</template>

<script>
    import {mapState} from 'vuex'
    export default {
      name: 'LanguageDescriptionList',
      data () {
        const headers = [
          { text: this.$t('Code'), value: 'code' },
          { text: this.$t('Description'), value: 'description' },
          { text: '', value: 'action', sortable: false }
        ]
        return {
          tableTexts: {
            rowsPerPageText: this.$t('Rows per page'),
            rowsPerPageItems: [5, 10, 25, {'text': this.$t('All'), 'value': -1}]
          },
          headers
        }
      },
      computed: {
        ...mapState('languagedescription', ['list'])
      }
    }
</script>

<style scoped>

</style>
