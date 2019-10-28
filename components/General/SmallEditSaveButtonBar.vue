<template>
    <v-flex class="small-edit-save-button-bar pa-0 ma-0">
        <template v-if="!editMode">
            <v-tooltip top close-delay="0" open-delay="0" v-if="!hideDelete">
                <v-btn slot="activator"  icon   flat :color="color"  @click="onDeleteClick">
                    <v-icon>delete</v-icon>
                </v-btn>
                <span>{{$t('Delete')}}</span>
            </v-tooltip>


            <v-tooltip top close-delay="0" open-delay="0">
                <v-btn slot="activator"   icon  flat :color="color"  @click="onEditClick">
                    <v-icon>edit</v-icon>
                </v-btn>
                <span>{{$t('Edit')}}</span>
            </v-tooltip>
        </template>

        <template v-if="editMode">
            <v-tooltip top close-delay="0" open-delay="0" v-if="!hideCancel">
                <v-btn slot="activator"  icon   flat :color="color"  @click="onCancelClick">
                    <v-icon>exit_to_app</v-icon>
                </v-btn>
                <span>{{$t('Cancel')}}</span>
            </v-tooltip>

            <v-tooltip top close-delay="0" open-delay="0">
                <v-btn slot="activator"  icon   flat :color="color"  @click="onSaveClick">
                    <v-icon>save</v-icon>
                </v-btn>
                <span>{{$t('Save')}}</span>
            </v-tooltip>
        </template>
    </v-flex>
</template>

<script>
  export default {
    components: {},
    props: {'hideCancel': {default: false}, 'hideDelete': {default: false}, 'editMode': Boolean, 'color': {default: 'grey darken-1'}},
    methods: {
      onEditClick () {
        this.$emit('edit')
      },
      onDeleteClick () {
        this.$emit('delete')
      },
      onSaveClick () {
        this.$emit('save')
      },
      onCancelClick () {
        this.$emit('cancel')
      }
    }
  }
</script>

<style lang="scss">
    .small-edit-save-button-bar {

        .btn{
            margin:0;
        }

    }

</style>
