<template>
    <v-text-field  box :label="$t('Paragraph title')" v-model="text"/>
</template>
<script>
import {mapState} from 'vuex'

export default {
  name: 'TermTitle',
  computed: {
    ...mapState('terms', ['ui']),
    text: {
      get () {
        return this.$store.state.terms.$record.paragraphs[this.index].title[this.ui.tabLanguage]
      },
      set (value) {
        const language = this.ui.tabLanguage
        const {index} = this
        this.$store.dispatch('terms/updateTitle', {value, index, language})
      }
    }
  },
  props: ['index']
}
</script>

<style lang="scss">

</style>
