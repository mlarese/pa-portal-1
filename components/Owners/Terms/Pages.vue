<template>
    <v-container fluid  class="pages pa-1" >
        <v-card>
            <v-toolbar class="elevation-2" color="light-blue darken-2" dark dense>
                <v-toolbar-title>
                    {{$t('Terms Url')}}
                </v-toolbar-title>
            </v-toolbar>

            <v-flex xs12 mt-2>
                <template v-for="(p, i) in pages">
                    <page :index="i" :key="i" v-if="!p.deleted"/>
                </template>
            </v-flex>

            <v-flex>
                <add-btn add="Add url" @click="addUrl()" />
            </v-flex>

        </v-card>


    </v-container>
</template>

<script>
  import Page from './Page'
  import {mapState} from 'vuex'
  import AddBtn from '../../General/AddBtn'

  export default {
    name: 'Pages',
    methods: {
      addUrl () {
        this.$record.pages.push({domain: null, page: null, termUid: this.$record.uid, phantom: true})
      }
    },
    computed: {
      ...mapState('terms', ['$record'])
    },
    components: {
      Page,
      AddBtn
    },
    props: ['pages']
  }
</script>

<style>

</style>
