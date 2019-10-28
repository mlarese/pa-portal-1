<template>
    <v-layout row wrap>
        <v-flex xs12 class="mb-2">
            <LogsDateRangeFilter @on-change="loadFiltered"/>
        </v-flex>

        <v-flex xs12>
            <LogList title="Titolari: Creazione" :logs="list" type="owner_creation" :loading="isAjax" />
        </v-flex>
        <v-flex xs12 class="pt-2">
            <LogList title="Titolari: Modifiche" :logs="list" type="owner_modified" :loading="isAjax" />
        </v-flex>

        <v-flex xs12 class="pt-2">
            <LogList title="Titolari: Invio email di password reset" :logs="list" type="owners_email_password_rest" :loading="isAjax" />
        </v-flex>

        <v-flex xs12 class="pt-2">
            <LogList title="Titolari: Password reset" :logs="list" type="owners_password_rest" :loading="isAjax" />
        </v-flex>

    </v-layout>

</template>

<script>
  import LogList from '../../../components/Logs/LogList'
  import {mapState, mapActions} from 'vuex'
  import LogsDateRangeFilter from '../../../components/Logs/LogsDateRangeFilter'

  const root = {root: true}

  export default {
    methods: {
      ...mapActions('operators/logins', ['loadFiltered'])
    },
    components: {
      LogList, LogsDateRangeFilter
    },
    computed: {
      ...mapState('api', ['isAjax']),
      ...mapState('operators/actionhistory', ['list'])
    },
    async fetch ({store}) {
      await store.dispatch('operators/actionhistory/load', {}, root)
    }
  }
</script>

<style>

</style>
