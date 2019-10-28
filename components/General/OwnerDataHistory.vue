<template>
    <LogList logs="filteredLogs" title="Cambi password"/>
</template>

<script>
    import {loghandler} from '../Logs/logmixin'

    export default {
      name: 'UserDataHistory',
      mixins: [loghandler('operators/actionhistory','password_change')]
    }
</script>
