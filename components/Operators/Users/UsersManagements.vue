<template>
    <v-flex container pa-0>
        <form-bar :disabled="!form.valid" @on-save="onSave" to="/operators/users" color="yellow" caption="Save User" />

        <v-card>
            <users-form/>
        </v-card>
    </v-flex>
</template>

<script>
  import UsersForm from './UsersForm'
  import {mapState, mapActions} from 'vuex'
  import FormBar from '../../General/FormBar'

  export default {
    name: 'UsersManagements',
    methods: {
      ...mapActions('operators/users', ['save']),
      onSave () {
        this.save({data: this.$record, id: this.$record.code})
          .then(r => {
            this.$router.push('/operators/users')
            return r
          })
      }
    },
    computed: {
      ...mapState('operators/users', ['$record', 'record', 'form'])
    },
    components: {
      UsersForm,
      FormBar
    }
  }
</script>

<style>

</style>
