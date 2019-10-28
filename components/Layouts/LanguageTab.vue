<template>
        <v-tabs right v-model="index" show-arrows>
            <v-tabs-slider color="grey"></v-tabs-slider>

            <template v-for="(t, i) in tabLanguages">
                <v-tab  :key="t.id" v-if="t.active" >
                    {{ t.label }}
                </v-tab>
            </template>

        </v-tabs>

</template>

<script>
  import {mapState, mapMutations} from 'vuex'

  export default {
    name: 'LanguageTab',
    methods: {
      ...mapMutations('layouts', ['setTabLanguage'])
    },
    watch: {
      index () {
        const lang = this.languages[this.index].id
        this.setTabLanguage(lang)
      }
    },
    data () {
      return {
        index: 0
      }
    },
    computed: {
      ...mapState('layouts', ['ui']),
      ...mapState('app', ['languages']),
      // ...mapState('owners', ['$record'])
      tabLanguages () {
        return [{
          'id': 'it',
          'label': 'ITA',
          'active': true
        }, {
          'id': 'en',
          'label': 'ENG',
          'active': true
        }, {
          'id': 'de',
          'label': 'DEU',
          'active': true
        }]
      }
    }
  }
</script>
