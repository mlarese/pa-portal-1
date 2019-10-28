<template>
    <v-container>
        <v-layout row wrap class="mb-3">
            <v-flex xs12 class="pa-1">
                <v-layout column class="mb-3">
                    <v-toolbar class="elevation-1" dark=""  dense color="deep-orange lighten-2">
                        <v-toolbar-title>{{$t('Owners')}}</v-toolbar-title>
                        <v-spacer></v-spacer>

                    </v-toolbar>

                    <OwnersStat></OwnersStat>



                </v-layout>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
  import OwnersStat from '../../Owners/OwnersStat'
  const root = {root: true}

  export default {
    created () {
      this.$store.dispatch('domains/loadAll', {force: false}, root)
      this.$store.dispatch('owners/loadOwnerStat', {}, root)
    },
    components: {
      OwnersStat
    }
  }
</script>

<style>

</style>
