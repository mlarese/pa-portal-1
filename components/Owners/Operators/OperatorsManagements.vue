<template>
    <v-flex container  pa-0 class="operators-management">
        <form-bar :disabled="isDisabled" @on-save="onSave" to="/owners/operators" color="orange darken-1" caption="Save Operator" />
        <v-card class="mb-2"><operators-data-form/></v-card>
        <v-card class="mb-2"><operators-accessibility-form/></v-card>
        <v-card class="mb-2"><operators-role-form/></v-card>
    </v-flex>
</template>

<script>
  import OperatorsDataForm from './OperatorsDataForm'
  import OperatorsAccessibilityForm from './OperatorsAccessibilityForm'
  import OperatorsRoleForm from './OperatorsRoleForm'
  import BtnCmds from '../../General/BtnCmds'
  import FormBar from '../../General/FormBar'
  import {formHandler} from '../../../mixins/form'

  export default {
    mixins: [formHandler('owners/operators')],
    components: {
      OperatorsDataForm,
      OperatorsAccessibilityForm,
      OperatorsRoleForm,
      BtnCmds,
      FormBar
    },
    methods: {
      onSave () {
        this.setFormSaving(true)
        this.$nextTick(this.$nuxt.$loading.start)
        this.save({data: this.$record, id: this.$record.id})
          .then(r => this.$router.push('/owners/operators'))
          .catch(() => { this.setFormSaving(false) })
          .then(() => this.$nextTick(this.$nuxt.$loading.start))
      }
    }
  }
</script>

<style>

</style>
