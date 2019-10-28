<template>
    <div>

        <v-toolbar dense>
            <v-toolbar-title>{{$t('Attachments')}}</v-toolbar-title>
        </v-toolbar>
        <v-card class="" height="200" style="overflow: auto">

            <v-list two-line style="min-height: 200px" dense>
                <template v-for="(a, i) in currentAttachments">
                    <v-list-tile avatar :key="i">

                        <v-list-tile-avatar color="blue darken-2" >
                            <v-btn avatar flat dark @click="onShowFile(i)">
                                <v-icon dark large dark >description</v-icon>
                            </v-btn>

                        </v-list-tile-avatar>

                        <v-list-tile-content>
                            <v-list-tile-title v-text="a.fileName"></v-list-tile-title>
                            <v-list-tile-sub-title>
                                <v-text-field class="attachment-description-input"
                                    v-model="a.description"
                                    hide-details
                                    :disabled="!editMode"
                                    solo
                                />
                            </v-list-tile-sub-title>
                        </v-list-tile-content>
                        <v-list-tile-action v-if="editMode">
                            <v-btn flat icon @click="deleteItem(i)"><v-icon>delete</v-icon></v-btn>
                        </v-list-tile-action>
                    </v-list-tile>
                    <v-divider/>
                </template>
            </v-list>
        </v-card>
    </div>
</template>

<script>
  // import _cloneDeep from 'lodash/cloneDeep'
  export default {
    props: ['attachments', 'editMode'],
    data () {
      return {
        $attachments: []
      }
    },
    name: 'AttachmentList',
    computed: {
      currentAttachments () {
        if (!this.attachments || !this.attachments.filter) return []
        return this.attachments.filter(o => !o.deleted)
      }
    },
    methods: {
      onShowFile (i) {
        this.$emit('download-attachment', i)
      },
      deleteItem (i) {
        this.$emit('delete-attachment', i)
      }
    }
  }
</script>

<style lang="scss">
    .attachment-description-input{
        min-height: 20px;
        .input-group__input {padding: 0 !important; border-width: 0}
        input {padding: 0 0 0 5px;  background: #f6f6f6}

    }
</style>
