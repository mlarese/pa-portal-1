<template>
    <v-layout row wrap>
        <v-flex xs12 class="mb-2">
            <LogsDateRangeFilter @on-change="loadFiltered"/>
        </v-flex>

        <v-flex xs12>
            <LogLoginList title="Operatori: Log di Accesso" type="operators" :logs="list" :loading="isAjax" />
        </v-flex>

        <v-flex xs12 class="pt-2">
            <LogLoginList title="Titolari: Log di Accesso" type="owners" :logs="list" :loading="isAjax" />
        </v-flex>

    </v-layout>

</template>

<script>
  import LogsDateRangeFilter from '../../../components/Logs/LogsDateRangeFilter.vue'
  import LogLoginList from '../../../components/Logs/LogLoginList'
  import {mapState, mapActions} from 'vuex'
  const root = {root: true}

  export default {
    components: {
      LogLoginList, LogsDateRangeFilter
    },
    computed: {
      ...mapState('api', ['isAjax']),
      ...mapState('operators/logins', ['list', 'filter'])
    },
    methods: {
      ...mapActions('operators/logins', ['loadFiltered'])
    },
    async fetch ({store}) {
      await store.dispatch('operators/logins/loadFiltered', {}, root)
    }
  }
</script>

<style>

</style>
