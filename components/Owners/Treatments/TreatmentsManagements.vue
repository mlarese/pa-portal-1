<template>
    <v-flex container pa-0>
        <form-bar :disabled="!form.valid" @on-save="onSave" to="/owners/treatments" color="orange darken-1" caption="Save Treatment" />

        <v-card>
            <treatments-forms/>
        </v-card>
    </v-flex>
</template>

<script>
  import BtnCmds from '../../General/BtnCmds'
  import TreatmentsForms from './TreatmentsForms'
  import {mapState, mapActions} from 'vuex'
  import FormBar from '../../General/FormBar'

  export default {
    methods: {
      ...mapActions('treatments', ['save']),
      onSave () {
        this.$nextTick(this.$nuxt.$loading.start)
        this.save({data: this.$record, id: this.$record.code})
          .then(r => {
            this.$router.push('/owners/treatments')
            return r
          })
          .catch(() => { this.setFormSaving(false) })
          .then(() => this.$nextTick(this.$nuxt.$loading.start))
      }
    },
    computed: {
      ...mapState('treatments', ['$record', 'record', 'form'])
    },
    components: {
      TreatmentsForms,
      BtnCmds,
      FormBar
    }
  }
</script>

<style>

</style>
