<template>
    <v-container class="request-user-forms">
        <v-layout row>
            <v-flex xs12 sm6>
                <v-text-field
                        :disabled="!canSave"
                        box
                        :label="$t('Mail')"
                        :rules="rules.mail"
                        required
                        v-model="$record.mail"/>
            </v-flex>
            <v-flex xs12 sm6>
                <v-text-field
                        :disabled="!canSave"
                        box
                        :label="$t('Type')"
                        :rules="rules.type"
                        required
                        v-model="$record.type"/>
            </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex xs12 sm6>
                <v-text-field
                        :disabled="!canSave"
                        box
                        :label="$t('Domain')"
                        v-model="$record.domain"/>
            </v-flex>
            <v-flex xs12 sm6>
                <v-text-field
                        :disabled="!canSave"
                        box
                        :label="$t('Site')"
                        v-model="$record.site"/>
            </v-flex>
        </v-layout>
        <v-layout row>
        <v-flex xs12 sm6>
            <v-select
                    :disabled="!canSave"
                    :items="status"
                    v-model="$record.status"
                    :label="$t('Status')"
                    item-value="text"
            />
        </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex xs12>
                <v-text-field
                        :disabled="!canSave"
                        box
                        multi-line
                        :label="$t('Note')"/>
            </v-flex>
        </v-layout>
    </v-container>

</template>

<script>
  import {mapState, mapGetters} from 'vuex'
  export default {
    computed: {
      ...mapState('owners/userrequests', ['$record', 'record', 'status']),
      ...mapGetters('auth', ['canSave'])
    },
    data () {
      return {
        e2: false,
        rules: {
          mail: [v => !!v || this.$t('required')],
          type: [v => !!v || this.$t('required')]
        }
      }
    }
  }
</script>

<style>

</style>
