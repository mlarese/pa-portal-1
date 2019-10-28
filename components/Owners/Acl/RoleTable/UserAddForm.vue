<template>
    <v-container row class="user-add-form">
        <v-layout row>
            <v-flex xs4>
                <v-subheader>{{$t('Term')}}</v-subheader>
            </v-flex>
            <v-flex xs8>
                <v-select
                        v-model="$record.termId"
                        :label="$t('term')"
                        item-text="name"
                        item-value="code"
                        required
                        :rules="rules.term"
                />
            </v-flex>
        </v-layout>
        <v-layout row v-for="(flag, index) in flags" :key="index">
            <v-checkbox
                    v-model="flag.selected"
                    :label="$t('name')"
                    required
            ></v-checkbox>
        </v-layout>
        <v-card>
        <v-layout row wrap>
            <v-flex xs12 sm6>
                <v-text-field
                        v-model="$record.name"
                        box
                        :label="$t('name')"
                        required
                        :rules="rules.name"
                />
            </v-flex>
            <v-flex xs12 sm6>
                <v-text-field
                        v-model="$record.surname"
                        box
                        :label="$t('surname')"
                />
            </v-flex>
            <v-flex xs12 sm6>
                <v-text-field
                        v-model="first"
                        box
                        :label="$t('email')"
                        required
                        :rules="rules.email"
                />
            </v-flex>
            <v-flex xs12 sm6>
                <v-text-field
                        v-model="$record.telephone"
                        box
                        :label="$t('telephone')"
                        required
                        :rules="rules.telephone"
                />
            </v-flex>
            <v-flex xs12 sm6>
                <v-text-field
                        v-model="$record.domain"
                        box
                        :label="$t('domain')"/>
            </v-flex>
            <v-flex xs12 sm6>
                <v-text-field
                        v-model="$record.site"
                        box
                        :label="$t('site')"/>
            </v-flex>
            <v-flex xs12 sm6>
                <v-select
                        :items="language"
                        v-model="$record.language"
                        :label="$t('languages')"
                        item-value="text"
                />
            </v-flex>
        </v-layout>
            <v-btn >{{$t('Save')}}</v-btn>
            <v-btn>{{$t('Cancel')}}</v-btn>
        </v-card>
    </v-container>
</template>

<script>
  export default {
    data () {
      return {
        $record: {},
        rules: {
          term: [v => !!v || this.$t('required')],
          name: [v => !!v || this.$t('required')],
          email: [v => !!v || this.$t('required')],
          telephone: [v => !!v || this.$t('required')]
        }
      }
    },
    props: ['term', 'flag', 'languages']
  }
</script>

<style>

</style>
