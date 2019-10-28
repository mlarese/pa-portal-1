<template>
    <v-container fluid>
        <v-layout row child-flex wrap>
            <div>
                <v-toolbar dense class="elevation-0">
                    <v-btn>
                        <v-icon>arrow_back</v-icon>
                    </v-btn>

                    <v-spacer></v-spacer>

                    <v-btn>
                        <v-icon>save</v-icon>
                    </v-btn>
                </v-toolbar>
            </div>
            <v-layout row wrap>

                <v-flex xs12 sm6>
                    <v-text-field
                            single-line
                            v-model="$record.code"
                            :label="$t('Code')"
                    ></v-text-field>
                </v-flex>

                <v-flex xs12 sm6>
                    <v-text-field
                            single-line
                            v-model="$record.description"
                            :label="$t('Description')"
                            :rules="rules.code"
                            required
                    ></v-text-field>
                </v-flex>
            </v-layout>
            <v-card>
            <language-tab/>
            <v-flex xs6>
                <v-textarea
                        solo
                        name="input-7-4"
                        :label="$t('Text Translation')"
                        value="The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through."
                ></v-textarea>
            </v-flex>
            </v-card>
        </v-layout>
    </v-container>
</template>

<script>
    import {mapState} from 'vuex'
    import LanguageTab from '../Owners/Terms/LanguageTab'
    export default {
      components: {LanguageTab} ,
      name: 'LanguageDescriptionForm',
      data () {
        return {
          e2: true,
          rules: {
            description: [v => !!v || this.$t('required')]
          }
        }
      },
      computed: {
        ...mapState('languagedescription', ['$record', 'record'])
      },
      props: []
    }
</script>

<style scoped>

</style>
