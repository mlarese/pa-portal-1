<template>
        <v-tabs right v-model="index" show-arrows>
            <v-tabs-slider color="grey"></v-tabs-slider>
            <template v-for="(t, i) in languages">
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
      ...mapMutations('terms', ['setTabLanguage'])
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
      ...mapState('terms', ['ui']),
      ...mapState('app', ['languages'])
      // ...mapState('owners', ['$record'])
      // languages () { return this.$record.profile.languages  }
    }
  }
</script>
