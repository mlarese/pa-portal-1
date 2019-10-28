<template>
    <v-layout row>


           <v-flex>
               <v-card>
                   <v-toolbar class="elevation-1">
                       <v-toolbar-title >
                           {{$t('Active language')}}
                       </v-toolbar-title>

                   </v-toolbar>

                   <v-list two-line dense>
                       <template v-for="(l, i) in languages">
                           <v-list-tile avatar @click="" >
                               <v-list-tile-action>
                                   <v-checkbox v-model="l.active"></v-checkbox>
                               </v-list-tile-action>
                               <v-list-tile-content>
                                   <v-list-tile-title v-html="l.label"></v-list-tile-title>
                               </v-list-tile-content>
                           </v-list-tile>
                       </template>
                   </v-list>
               </v-card>
           </v-flex>



    </v-layout>
</template>
<script>
  import {mapState} from 'vuex'

  export default {
    computed: {
      ...mapState('owners', ['$record']),
      languages () {
        return this.$record.profile.languages
      }
    }
  }
</script>