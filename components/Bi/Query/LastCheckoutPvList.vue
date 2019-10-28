<template>
    <v-container row  class="last-check-out-list pa-0" >
        <v-data-table
                :headers="headers"
                :items="privaciesListFlt"
                class="elevation-1"
                v-bind="tableTexts"
                :loading="isAjax"
        >

            <template slot="items" slot-scope="p">
                <tr>
                    <td>

                        <b>{{ p.item.email }}</b>
                    </td>
                    <td>

                        <span  v-if="p.item.created && p.item.created.date" style="position: relative;top:2px;">{{ p.item.created.date |dmy }}</span>
                        <span  v-else style="position: relative;top:2px;">{{ p.item.created |dmy }}</span>
                    </td>

                    <td>
                        <div class="ml-3" v-for="fl in p.item.privacyFlags" style="white-space: nowrap">
                            <input :disabled="true" type="checkbox" v-model="fl.selected"> {{fl.code}}

                            <span v-if="fl.mandatory">*</span>
                            <span v-if="fl.unsubscribe">({{fl.user}})  </span>
                        </div>

                    </td>

                    <td> {{ p.item.surname }}  {{ p.item.name }}</td>
                    <td> {{ p.item.language }} </td>

                    <!-- td class="justify-center layout px-0 pt-2">
                        <nuxt-link :to="'/owners/users/'+ encodedId(p.item.email) + '?mode=edit'">
                            <v-tooltip left>
                                <v-btn slot="activator" flat small icon color="blue" class="pa-0 ma-0">
                                    <v-icon>edit</v-icon>
                                </v-btn>
                                <span>{{$t('Edit user')}}</span>
                            </v-tooltip>
                        </nuxt-link>

                    </td -->
                </tr>
            </template>

        </v-data-table>
    </v-container>
</template>

<script>
  import {mapState, mapGetters} from 'vuex'
  // import _findKey from 'lodash/findKey'
  export default {
    methods: {
      encodedId (email) {
        return encodeURI(btoa(email))
      }
    },
    data () {
      const headers = [
        { text: this.$t('Email'), value: 'email' },
        { text: this.$t('Created'), value: 'created', width: '100px' },
        { text: this.$t('Flags'), value: 'id', sortable: false },
        { text: this.$t('Surname') + ' ' + this.$t('Name'), value: 'surname' },
        { text: this.$t('Language'), value: 'language' }
        // { text: this.$t('Actions'), value: 'action' }
      ]
      return {
        tableTexts: {
          rowsPerPageText: this.$t('Rows per page'),
          rowsPerPageItems: [10, 20, 50, 100]
        },
        headers
      }
    },
    components: {
    },
    computed: {
      ...mapGetters('bi/qrLastCheckout', ['privaciesByEmail']),
      ...mapState('bi/qrLastCheckout', ['list', 'privaciesList']),
      ...mapState('api', ['isAjax']),
      privaciesListFlt () {
        return this.privaciesList.filter(o => o.email)
      },
      privaciesListExport () {
        return this.privaciesListFlt
      }
    }
  }
</script>

le>
