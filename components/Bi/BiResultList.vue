<template>
    <v-layout row>
        <v-flex>
            <v-card>

                <v-toolbar dense  class="elevation-1" >
                    <v-toolbar-title>{{$t('Ricerche salvate')}}</v-toolbar-title>
                </v-toolbar>
                <v-list two-line style="height: 300px;overflow-y:auto">
                    <template v-for="(item, index) in resultList">
                        <v-list-tile :key="item.id" avatar @click="loadData(item)" >
                            <v-list-tile-avatar>
                                <v-icon class="blue white--text">folder_open</v-icon>
                            </v-list-tile-avatar>
                            <v-list-tile-content>
                                <v-list-tile-title v-html="item.description"></v-list-tile-title>
                                <v-list-tile-sub-title>{{item.creationDate.date|dmy}}</v-list-tile-sub-title>
                            </v-list-tile-content>
                        </v-list-tile>
                        <v-divider></v-divider>
                    </template>
                </v-list>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
  import {mapState, mapActions} from 'vuex'
  export default {
    methods: {
      ...mapActions('bi/qrLastCheckout', ['loadResultListRecord']),
      loadData (item) {
        this.loadResultListRecord(item.id)
        this.$emit('result-loaded')
      }
    },
    computed: {
      ...mapState('bi/qrLastCheckout', ['resultList'])
    },
    components: {
    }
  }
</script>

<style scoped>

</style>
