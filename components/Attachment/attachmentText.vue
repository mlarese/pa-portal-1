<template>
    <div row class="attachment">
        <v-list two-line :item="list">
            <template v-for="(item) in items">
                <v-list-tile>
                    <v-list-tile-avatar>
                        <v-icon>description</v-icon>
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                        <v-list-tile-title v-model="item.filename"></v-list-tile-title>
                        <v-text-field v-model="item.description"></v-text-field>
                    </v-list-tile-content>
                    <v-list-tile-action>
                        <v-list-tile-action-text></v-list-tile-action-text>
                        <v-btn color="success">Save</v-btn>
                        <v-btn color="error">Cancel</v-btn>
                    </v-list-tile-action>
                </v-list-tile>
            </template>
        </v-list>
        <v-divider></v-divider>
    </div>
</template>

<script>
    import attachmentItem from './attachmentItem'
    export default {
      data () {
        return {
          items: [{
            filename: 'Brunch',
            description: 'just trying the file to know how good'
          }]
        }
      },
      props: ['list'],
      components: {attachmentItem},
      name: 'Attachment'
    }
</script>

<style scoped>

</style>
