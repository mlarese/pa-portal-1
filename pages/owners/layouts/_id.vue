<template>
    <v-layout column>
        <v-toolbar  class="elevation-2  grey lighten-2" >
            <v-toolbar-title>
                {{$t('Double-optin template')}}
                <v-spacer></v-spacer>
                <span class="subheading"> {{owner.company}}</span>
            </v-toolbar-title>

        </v-toolbar>
        <v-card class="pa-3">
            <v-layout row>
                <LayoutForm />
            </v-layout>
        </v-card>
    </v-layout>
</template>
<script>
  import LayoutForm from '../../../components/Layouts/LayoutForm'
  import {mapState} from 'vuex'
  export default {
    components: {LayoutForm},
    async fetch ({store, params}) {
      const id = params.id
      const all = [
        store.dispatch(`domains/loadby`, {id}, {root: true}),
        store.dispatch('terms/loadby', {id}, {root: true}),
        store.dispatch(`layouts/loadby`, {id}, {root: true}),
        store.dispatch(`owners/load`, {id}, {root: true})
          .then(res => store.commit(`layouts/setOwner`, res.data, {root: true}))
          .then(() => store.commit(`layouts/setCurrentLayout`, 'default', {root: true}))
      ]
      await Promise.all(all)
    },
    computed: {
      ...mapState('layouts', ['owner'])
    },
    props: []
  }
</script>
