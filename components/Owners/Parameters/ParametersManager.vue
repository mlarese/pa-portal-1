<template>
    <v-flex container  pa-0 >
        <form-bar :disabled="isDisabled" @on-save="onSave" to="/" color="orange darken-1" caption="Save Config" />

        <v-flex>
            <parameters-languages />
        </v-flex>
    </v-flex>
</template>
<script>
  import ParametersLanguages from './ParametersLanguages'
  import FormBar from '../../General/FormBar'
  import {mapActions, mapState} from 'vuex'

export default {
    components: {
      FormBar,
      ParametersLanguages
    },
    methods: {
      ...mapActions('ownerconfig', ['save']),
      onSave () {
        const {profile} = this.$record
        this.save({data: {profile}, id: this.$record.id})
          .then(r => this.$router.push('/'))
      }
    },
    computed: {
      ...mapState('owners', ['$record']),
      isDisabled () {
        return false
      }
    }
  }
</script>
