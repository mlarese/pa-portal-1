<template>
    <v-flex container pa-0>
        <v-card>
            <user-request-form/>
        </v-card>
    </v-flex>
</template>

<script>
  import UserRequestForm from './UserRequestForm'
  import {mapState, mapActions} from 'vuex'
  export default {
    methods: {
      ...mapActions('owners/userrequests', ['save']),
      onSave () {
        this.save({data: this.$record, id: this.$record.id})
          .then(r => {
            this.$router.push('/owners/userrequests')
            return r
          })
      }
    },
    computed: {
      ...mapState('owners/userrequests', ['$record', 'record', 'form'])
    },
    components: {
      UserRequestForm
    }
  }
</script>

<style>

</style>