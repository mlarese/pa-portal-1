<template>

    <DateRangeFilter v-on="$listeners" :filter="logFilter"/>

</template>

<script>
  import DateRangeFilter from '../General/DateRangeFilter'
  import {mapState} from 'vuex'

  export default {
    name: 'LogsDateRangeFilter',
    components: {
      DateRangeFilter
    },
    computed: {
      ...mapState('app', ['logFilter'])
    }
  }
</script>
