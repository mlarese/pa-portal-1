<template>
    <v-flex container pa-0>
        <form-bar :disabled="isDisabled" @on-save="onSave" to="/operators/owners" color="blue lighten-1" caption="Save Owner" />
            <v-card class="mb-2"><owners-form/></v-card>
            <v-card class="mb-2"><owners-domain/></v-card>
    </v-flex>
</template>

<script>
  import OwnersDomain from './OwnersDomain'
  import OwnersForm from './OwnersForm'
  import BtnCmds from '../../General/BtnCmds'
  import FormBar from '../../General/FormBar'
  import {formHandler} from '../../../mixins/form'
  import {mapGetters} from 'vuex'

  export default {
    components: {
      OwnersDomain,
      OwnersForm,
      BtnCmds,
      FormBar
    },
    mixins: [formHandler('owners')],
    computed: {
      ...mapGetters('owners', ['isAddMode'])
    },
    methods: {
      onSave () {
        this.setFormSaving(true)
        this.$nextTick(this.$nuxt.$loading.start)
        this.save({data: this.$record, id: this.$record.id})
          .then(r => this.$router.push('/operators/owners'))
          .catch(() => { this.setFormSaving(false) })
          .then(() => this.$nextTick(this.$nuxt.$loading.start))
      }
    }
  }
</script>

<style>

</style>
