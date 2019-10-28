<template>
    <FileAttachmentManager :list="attacments"/>
</template>

<script>
  import FileAttachmentManager from '../../components/General/FileAttachment/FileAttachmentManager'
  import attacments from '../../storeimp/fixtures/attachments'

  export default {
    name: 'fileattach',
    auth: false,
    data () {
      return {
        attacments
      }
    },
    components: {
      FileAttachmentManager
    }
  }
</script>

<style scoped>

</style>
