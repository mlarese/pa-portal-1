<template>
    <v-container row class="operator-list pa-0" fluid >
        <list-bar
            to="/owners/operators/add"
            color="orange darken-1"
            caption="Create New Operators"
            title="Management Operators"
            sub-title="List of Active Operators"
        />

        <v-data-table
                :headers="headers"
                :items="list"
                hide-actions
                class="elevation-1"
                :no-data-text="$t('No operators')"
        >
            <template slot="items" slot-scope="{item}">
                <td>{{item.name }}</td>
                <td>{{ item.surname }}</td>
                <td>{{ item.email }}</td>
                <td>{{ $t(item.role) }}</td>
                <td>
                    {{ item.periodFrom | dmySt}} <br>
                    <span v-if="item.periodTo">{{ item.periodTo | dmySt }}</span>
                </td>
                <td class="justify-center layout px-0">
                    <nuxt-link :to="'/owners/operators/'+ item.id + '?mode=edit'">
                        <v-btn flat icon color="blue" :disabled="!canSave">
                            <v-icon>edit</v-icon>
                        </v-btn>
                    </nuxt-link>
                    <nuxt-link :to="'/owners/operators/'+ item.id + '?mode=view'" v-if="false">
                        <v-btn icon class="mx-0" :disabled="!canSave">
                            <v-icon color="blue">search</v-icon>
                        </v-btn>
                    </nuxt-link>
                    <v-btn flat icon color="red" v-if="false" :disabled="!canSave">
                        <v-icon>delete</v-icon>
                    </v-btn>
                    <v-btn flat icon color="green" v-if="false" :disabled="!canSave">
                        <v-icon>group</v-icon>
                    </v-btn>
                </td>
            </template>
        </v-data-table>
    </v-container>
</template>

<script>
  import {mapState, mapGetters} from 'vuex'
  import format from 'date-fns/format'
  import ListBar from '../../General/ListBar'
  const module = 'owners/operators'

  export default {
    name: 'OperatorLists',
    filters: {
      time (value) {
        return format(value, 'dd/MM/yyyy HH:mm:ss')
      },
      dmy (value) {
        return format(value, 'dd/MM/yyyy')
      }
    },
    components: {
      ListBar
    },
    data () {
      const headers = [
        {text: this.$t('Name'), value: 'Name'},
        {text: this.$t('Surname'), value: 'Surname'},
        {text: this.$t('Email'), value: 'Email'},
        {text: this.$t('Role'), value: 'Role'},
        {text: this.$t('Period'), value: 'periodFrom'},
        {text: this.$t('Actions'), value: 'Actions'}
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
    }
  }
</script>

<style>

</style>
