<template>
        <v-layout class="mt-2">
            <v-flex xs6 >
                <AttachmentList :attachments="attachementsObject.attachments" :edit-mode="showUploader"  v-on="$listeners" />
            </v-flex>
            <v-flex xs6  >
                <Uploader @after-upload="afterUpload"  v-if="showUploader" v-bind="$attrs" />
            </v-flex>
        </v-layout>

</template>

<script>
  import Uploader from '../Uploader'
  import AttachmentList from './AttachmentList'

  export default {
    name: 'FileAttachmentManager',
    props: ['attachementsObject', 'editMode', 'showUploader'],
    methods: {
      afterUpload (files) {
        this.$emit('after-upload', files)
      }
    },
    components: {
      AttachmentList, Uploader
    }
  }
</script>

<style scoped>

</style>
