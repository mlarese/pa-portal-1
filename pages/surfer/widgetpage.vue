<template>
    <VWidget icon="edit" title="Great">
        <div slot="footer">
            gvhgv
        </div>
            <v-list two-line slot="body">
                        <v-list-tile @click="">
                            <v-list-tile-action>
                                <v-icon color="indigo">phone</v-icon>
                            </v-list-tile-action>

                            <v-list-tile-content>
                                <v-list-tile-title>(650) 555-1234</v-list-tile-title>
                                <v-list-tile-sub-title>Mobile</v-list-tile-sub-title>
                            </v-list-tile-content>

                            <v-list-tile-action>
                                <v-icon>chat</v-icon>
                            </v-list-tile-action>
                        </v-list-tile>
            </v-list>
        <v-icon slot="icon">edit</v-icon>
    </VWidget>
</template>

<script>
    import VWidget from '../../components/General/VWidget'
    export default {
      name: 'widgetpage',
      components: {VWidget},
      auth: false
    }
</script>

<style scoped>

</style>
