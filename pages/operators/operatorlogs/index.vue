<template>
    <v-layout row wrap>
        <v-flex xs12 class="mb-2">
            <LogsDateRangeFilter @on-change="loadFiltered"/>
        </v-flex>

        <v-flex xs12>
            <LogList title="Operatori: Creazione" :logs="list" type="operator creation" :loading="isAjax" />
        </v-flex>
        <v-flex xs12 class="pt-2">
            <LogList title="Operatori: Modifiche" :logs="list" type="operator update" :loading="isAjax" />
        </v-flex>

        <v-flex xs12 class="pt-2">
            <LogList title="Operatori: Invio email di password reset" :logs="list" type="operators_email_password_rest" :loading="isAjax" />
        </v-flex>

        <v-flex xs12 class="pt-2">
            <LogList title="Operatori: Password reset" :logs="list" type="operators_password_rest" :loading="isAjax" />
        </v-flex>

    </v-layout>

</template>

<script>
  import LogList from '../../../components/Logs/LogList'
  import {mapState, mapActions} from 'vuex'
  import LogsDateRangeFilter from '../../../components/Logs/LogsDateRangeFilter'

  const root = {root: true}

  export default {
    components: {
      LogList, LogsDateRangeFilter
    },
    methods: {
      ...mapActions('operators/logins', ['loadFiltered'])
    },
    computed: {
      ...mapState('api', ['isAjax']),
      ...mapState('operators/actionhistory', ['list'])
    },
    async fetch ({store}) {
      await store.dispatch('operators/actionhistory/loadFiltered', {}, root)
    }
  }
</script>

<style>

</style>
