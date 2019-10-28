<template>

    <div>

    <v-data-table
            :headers="headers"
            :items="list"
            class="elevation-1 surfers-list-table"
            v-bind="tableTexts"
            :pagination.sync="grid.pagination"
            :search="search.criteria"
            :loading="isAjax"

    >

        <template slot="items" slot-scope="p">
            <tr @click="onRowClick">
                <td>{{ p.item.created.date |dmy }} <br>
                    {{ p.item.created.date |time }}
                </td>
                <td style="display: flex" class="surfers-list-table-expander">
                    <!-- v-icon>person</v-icon -->
                    <div class="flex">{{ p.item.email }}</div>

                    <v-icon small v-if="!p.expanded">keyboard_arrow_down</v-icon>
                    <v-icon small v-else>keyboard_arrow_up</v-icon>

                </td>
                <td>
                    {{ p.item.surname }}<br>
                    {{ p.item.name }}
                </td>
                <td>{{ p.item.termName }}</td>
                <td>{{ p.item.page }}</td>

                <td class="justify-center layout px-0">
                    <nuxt-link :to="'/owners/users/'+ p.item.id + '?mode=edit'">
                        <v-btn :disabled="!canSave" flat icon color="blue">
                            <v-icon>edit</v-icon>
                        </v-btn>
                    </nuxt-link>
                    <nuxt-link :to="'/owners/users/'+ p.item.id + '?mode=view'" v-if="false">
                        <v-btn :disabled="!canSave" icon class="mx-0">
                            <v-icon color="blue">search</v-icon>
                        </v-btn>
                    </nuxt-link>
                    <v-btn :disabled="!canSave" flat icon color="red" v-if="false">
                        <v-icon>delete</v-icon>
                    </v-btn>
                </td>
            </tr>
        </template>

        <v-progress-linear slot="progress" color="blue" indeterminate></v-progress-linear>

        <template slot="expand" slot-scope="{item}">
            <v-card flat>
                <v-card-text class="">Ip: {{item.ip}}</v-card-text>
                <v-card-text class="py-0 my-0" v-for="(f, i) in item.privacyFlags" :key="i">
                    <v-icon v-if="f.selected">check_box</v-icon>
                    <v-icon v-else>check_box_outline_blank</v-icon>
                    {{f.code}}
                </v-card-text>
                <v-card-text></v-card-text>
            </v-card>
        </template>

        <template slot="pageText" slot-scope="{ pageStart, pageStop }">
            {{$t('From')}} {{ pageStart }} {{$t('To')}} {{ pageStop }}
        </template>

    </v-data-table>

    </div>
</template>
<script>
  import {mapState, mapGetters} from 'vuex'
  const module = 'owners/users'

  export default {
    name: 'UsersGrid',
    data () {
      const headers = [
        { text: this.$t('Created'), value: 'created.date' },
        { text: this.$t('Email'), value: 'email' },
        { text: this.$t('Surname and name'), value: 'denomination' },
        { text: this.$t('Term'), value: 'termName' },
        { text: this.$t('Url'), value: 'page' },

        { text: this.$t('Actions'), value: 'action' }
      ]
      return {
        tableTexts: {
          rowsPerPageText: this.$t('Rows per page'),
          rowsPerPageItems: [7, 20, 50, {'text': this.$t('All'), 'value': -1}]
        },
        module,
        headers
      }
    },
    computed: {
      ...mapState(module, ['list', 'search', 'grid']),
      ...mapState('api', ['isAjax']),
      ...mapGetters('auth', ['canSave'])
    }

  }
</script>
<style lang="scss">
    .surfers-list-table-expander {

    }

    .surfers-list-table {
        tr {
            cursor: pointer
        }
        td {
            cursor: pointer;
            vertical-align: baseline
        }
    }
</style>
