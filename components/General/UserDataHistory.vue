<template>
    <LogList logs="filteredLogs" title="Cambi password"/>
</template>

<script>
    import {loghandler} from '../Logs/logmixin'

    /**
     * privacy_config.action_history
     *('operator creation', 'operator update', 'owner_creation', 'owner_modified')
     */


    export default {
      name: 'UserDataHistory',
      mixins: [loghandler('owners/actionhistory','password_change')]
    }
</script>
