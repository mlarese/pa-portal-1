<template>
    <v-flex container pa-0>
        <form-bar :disabled="!form.valid" @on-save="onSave" to="/operators/customercare" color="amber lighten-1" caption="Save Operator" />
        <v-card>
            <customer-care-form/>
        </v-card>
    </v-flex>
</template>

<script>
  import CustomerCareForm from './CustomerCareForm'
  import {mapState, mapActions} from 'vuex'
  import FormBar from '../../General/FormBar'

  export default {
    methods: {
      ...mapActions('customerCare', ['save']),
      onSave () {
        this.$nextTick(this.$nuxt.$loading.start)
        this.save({data: this.$record, id: this.$record.id})
          .then(r => {
            this.$router.push('/operators/customercare')
            return r
          })
          .catch(() => { this.setFormSaving(false) })
          .then(() => this.$nextTick(this.$nuxt.$loading.start))
      }
    },
    computed: {
      ...mapState('customerCare', ['$record', 'record', 'form'])
    },
    components: {
      CustomerCareForm,
      FormBar
    }
  }
</script>

<style>

</style>
