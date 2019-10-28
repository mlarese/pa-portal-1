<template>
    <v-layout class="domains-and-pages" row>
        <v-flex>
            <v-card style="min-height:62px" color="white">

                <v-list>
                    <v-list-group
                            v-for="(pages, domain) in pagesByDomain"
                            v-model="pages.active"
                            :key="domain"
                            _prepend-icon="desktop_windows"
                            avatar
                            no-action
                    >

                        <v-list-tile slot="activator" class="py-3">
                            <v-list-tile-avatar>
                                <v-icon class="teal lighten-3 white--text">desktop_windows</v-icon>
                            </v-list-tile-avatar>
                            <v-list-tile-content>

                                <v-list-tile-title>
                                    <b>{{ domain }}</b>
                                </v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>

                        <v-list-tile  v-for="(page, i) in pages" :key="i" @click=""  class="py-2">
                            <v-list-tile-content style="min-height:20px;">
                                <v-list-tile-title>
                                    <v-icon class="mr-2">bookmark</v-icon>
                                    {{ domain+page.page }}
                                </v-list-tile-title>

                                <v-list-tile-sub-title v-if="false">
                                    |{{termsMap[page.termUid].name}}
                                </v-list-tile-sub-title>
                            </v-list-tile-content>
                            <v-list-tile-action>
                                <nuxt-link :to="'/owners/termsdash/'+ page.termUid">

                                    <v-tooltip left>
                                        <v-btn slot="activator" icon ripple>
                                            <v-icon color="blue lighten-1"  >subject</v-icon>
                                        </v-btn>
                                        <span>{{$t('Show associated term')}}</span>
                                    </v-tooltip>
                                </nuxt-link>
                            </v-list-tile-action>

                        </v-list-tile>

                    </v-list-group>
                </v-list>
            </v-card>
        </v-flex>
    </v-layout>
</template>
<script>
  import {mapGetters} from 'vuex'
  export default {
    name: 'DomainsAndPages',
    computed: {
      ...mapGetters('owners/termspages', ['pagesByDomain']),
      ...mapGetters('terms', ['termsMap'])
    }
  }
</script>
<style lang="scss">
    .domains-and-pages {
        .list__group--active {
            background: #B2EBF2 !important;
        }
    }

</style>
