<template>

        <v-flex class="term-editor">
            <v-navigation-drawer width="250" class="transparent" stateless permanent floating value="true" app clipped right>
                <terms-button class="mt-4"/>
            </v-navigation-drawer>

            <v-layout row wrap>
                <v-flex xs4 class="btn-back">
                    <v-btn flat small>
                        <v-btn-icon>
                            <v-icon>reply</v-icon>
                        </v-btn-icon>
                         {{$t('Back')}}

                    </v-btn>
                </v-flex>

                <v-flex xs8>
                    <language-tab class="mb-2" />
                </v-flex>

            </v-layout>


            <template v-for="(p, i) in paragraphs">
                <term-editor :index="i" :key="i"/>
            </template>

        </v-flex>



</template>
<script>
import LanguageTab from '../../components/Owners/Terms/LanguageTab'
import TermEditor from '../../components/Owners/Terms/TermEditor'
import TermsButton from '../../components/Owners/Terms/TermsButton'
import terms from '../../storeimp/fixtures/terms.json'
import {mapState} from 'vuex'

export default {
  auth: false,
  fetch ({store}) {
    store.commit('terms/setList', terms)
    store.commit('terms/setRecord', terms[0])
  },
  computed: {
    ...mapState('terms', ['ui', '$record']),
    paragraphs () {
      return this.$record.paragraphs
    }
  },
  components: {TermEditor, LanguageTab, TermsButton}
}
</script>

<style lang="scss">
    nav.app-tolbar {
        padding-right: 0 !important;
    }

    .term-editor{
        .btn-back {
            padding-top:12px;
            .btn--small .btn__content {
                padding: 0;
            }
        }
    }
</style>