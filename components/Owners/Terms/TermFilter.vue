<template>
    <div>

    </div>
</template>
<script>
  import {mapState} from 'vuex'
  export default {
    computed: {
      ...mapState('terms', ['termFilter'])
    }
  }
</script>
