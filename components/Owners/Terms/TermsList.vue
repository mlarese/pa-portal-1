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
                :no-data-text="$t('No terms')"
        >
            <template slot="items" slot-scope="{item}">
                <td>{{ item.name }}</td>
                <td>{{ $t(item.status) }}</td>
                <td>{{ item.created | dmy }}</td>
                <td>{{ item.modified | dmy}}</td>
                <td>{{ item.published | dmy}}</td>
                <td>{{ item.suspended | dmy}}</td>

                <td class="justify-center layout px-0">


                        <v-tooltip top>
                            <v-btn  @click="$router.push('/owners/terms/'+ item.uid)" :disabled="!canSave" slot="activator" flat icon color="blue">
                                <v-icon>edit</v-icon>
                            </v-btn>
                            <span>
                                {{$t('Edit')}}
                            </span>
                        </v-tooltip>


                    <v-tooltip top>
                        <v-btn :disabled="!canSave" slot="activator" flat icon  @click="onCopy(item.uid)" color="blue">
                            <v-icon>file_copy</v-icon>
                        </v-btn>
                        <span>
                            {{$t('Copy')}}
                        </span>
                    </v-tooltip>

                    <v-tooltip top>
                        <v-btn :disabled="!canSave || !item.deletable"  slot="activator" flat icon  @click="onDelete(item.uid)">
                            <v-icon>delete</v-icon>
                        </v-btn>
                        <span>
                            {{$t('Delete')}}
                        </span>
                    </v-tooltip>
                </td>
            </template>
        </v-data-table>
    </v-container>
</template>

<script>
  import {mapState, mapActions, mapGetters} from 'vuex'
  import ListBar from '../../General/ListBar'
  const module = 'terms'

  export default {
    name: 'TermsList',

    methods: {
      ...mapActions(module, ['copyTerm', 'load', 'delete']),
      onDelete (uid) {
        if (!confirm(this.$t('Delete') + ' - ' + this.$t('Do you confirm?'))) {
          return
        }

        this.delete(uid)
          .then(() => {
            this.load({})
          })
      },
      onCopy (uid) {
        if (!confirm(this.$t('Copy') + ' - ' + this.$t('Do you confirm?'))) {
          return
        }
        this.copyTerm(uid)
          .then(() => {
            this.load({})
          })
      }
    },
    data () {
      const headers = [
        { text: this.$t('Name'), value: 'name' },
        { text: this.$t('Status'), value: 'status' },
        { text: this.$t('Created_'), value: 'created' },
        { text: this.$t('Modified_'), value: 'modified' },
        { text: this.$t('Published_'), value: 'published' },
        { text: this.$t('Suspended_'), value: 'suspended' },
        { text: this.$t('Actions'), value: 'action' }
      ]

      return {
        tableTexts: {
          rowsPerPageText: this.$t('Rows per page'),
          rowsPerPageItems: [5, 10, 25, {'text': this.$t('All'), 'value': -1}]
        },
        module,
        headers
      }
    },
    computed: {
      ...mapState(module, ['list']),
      ...mapGetters('auth', ['canSave'])
    },
    components: {
      ListBar
    }
  }
</script>e
