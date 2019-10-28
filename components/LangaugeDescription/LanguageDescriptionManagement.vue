<template>
    <v-flex container pa-0>
        <v-card>
            <language-description-form/>
        </v-card>
    </v-flex>
</template>

<script>
    import LanguageDescriptionForm from './LanguageDescriptionForm'
    import {mapState, mapActions} from 'vuex'

    export default {
      methods: {
        ...mapActions('languagedescription', ['save']),
        onSave () {
          this.save({data: this.$record, id: this.$record.code})
            .then(r => {
              this.$router.push('languagedescription')
              return r
            })
        }
      },
      computed: {
        ...mapState('languagedescription', ['$record', 'record'])
      },
      components: {
        LanguageDescriptionForm
      }
    }
</script>

<style scoped>

</style>
