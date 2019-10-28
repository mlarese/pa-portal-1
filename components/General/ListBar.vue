<template>
    <div>
        <v-layout row>
            <v-flex xs6 class="my-2">
                <div class="title mb-1">{{$t(title)}}</div>
                <div>{{$t(subTitle)}}</div>
            </v-flex>

            <v-flex xs6 class="text-xs-right" pt-1>

                <v-tooltip left v-if="canAdd">
                    <v-btn slot="activator" fab dark :to="to" color="teal lighten-1"  class="elevation-1 mb-3" small>
                        <v-icon>add</v-icon>
                    </v-btn>
                    <span>{{$t(caption)}}</span>
                </v-tooltip>

            </v-flex>

        </v-layout>
    </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  export default {
    props: ['title', 'subTitle', 'caption', 'to', 'color'],
    computed: {
      ...mapGetters('auth', ['canAdd'])
    }
  }
</script>
