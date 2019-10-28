<template>
    <div row class="attachment">
            <v-list two-line>
                <template v-for="(item) in items">
                    <v-list-tile>
                        <v-list-tile-avatar>
                            <v-icon>description</v-icon>
                        </v-list-tile-avatar>
                            <v-list-tile-content>
                                <v-list-tile-title>{{ item.filename }}</v-list-tile-title>
                                <v-text-field
                                        solo
                                        single-line
                                        v-model="item.description"
                                ></v-text-field>
                            </v-list-tile-content>

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
