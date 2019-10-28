<template>
    <v-layout row>

        <v-flex xs12 sm6 offset-sm3>
            <v-card>
             <attachment-list/>
            </v-card>
        </v-flex>

    </v-layout>
</template>

<script>
    import attachmentList from '../../components/Attachment/AttachmentList'
    export default {
      components: {attachmentList},
      name: 'attachment',
      auth: false
    }
</script>

<style scoped>

</style>
