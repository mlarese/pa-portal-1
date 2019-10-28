<template>
    <v-layout pa-0 class="attachment-manager">
        <component :is="currentComponent"></component>
    </v-layout>
</template>

<script>
import attachmentItem from './attachmentItem'
import attachmentText from './attachmentText'
export default {
  components: {
    attachmentItem,
    attachmentText
  },
  computed: {
    currentComponent () {
      if (this.mode === 'view') {
        return attachmentItem
      } else {
        return attachmentText
      }
    }
  },
  name: 'attachmentFactory'
}
</script>

<style scoped>

</style>
