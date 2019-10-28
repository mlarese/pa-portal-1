<template>
    <wysiwyg v-model="text" placeholder="" class="term-editor"  />
</template>
<script>
import {mapState} from 'vuex'

export default {
  name: 'TermEditor',
  computed: {
    ...mapState('terms', ['ui']),
    text: {
      get () {
        return this.$store.state.terms.$record.paragraphs[this.index].text[this.ui.tabLanguage]
      },
      set (value) {
        const language = this.ui.tabLanguage
        const {index} = this
        this.$store.dispatch('terms/updateParagraph', {value, index, language})
      }
    }
  },
  props: ['index']
}
</script>

<style lang="scss">
    .term-editor {
        background: white;
        .editr--content {
            font-size:13px;
            height: 400px;
        }
    }
</style>
