<template>
    <v-layout row>
        <v-flex xs12>
            <v-select
                    :label="$t('Domain')"
                    v-model="domain"
            ></v-select>hh
        </v-flex>
    </v-layout>
</template>

<script>
  export default {
    props: {
    },
    data () {
      return {
        domain: [
          'color', 'music', 'sound'
        ]
      }
    }
  }
</script>

<style>

</style>