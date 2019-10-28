<template>
    <v-layout row wrap style="border-bottom: 1px solid silver" class="mb-2">
        <v-flex xs4 class="btn-back" pt-1>
            <v-tooltip right>
                <v-btn slot="activator" fab flat small class="mx-0" :to="to" active-class="">
                    <v-icon>reply</v-icon>
                </v-btn>
                <span>{{$t('Back')}}</span>
            </v-tooltip>

        </v-flex>
        <v-spacer></v-spacer>

        <v-tooltip left>
            <v-btn
                slot="activator"
                color="green darken-3"
                dark
                fab
                small
                @click="onSave"
                class="elevation-0 mb-2"
                :disabled="isDisabled"
            >
                <v-icon>save</v-icon>
            </v-btn>
            <span>{{$t(caption)}}</span>
        </v-tooltip>
    </v-layout>
</template>
<script>
  import {mapState, mapGetters} from 'vuex'

  export default {
    name: 'FormBar',
    props: ['to', 'color', 'disabled', 'caption'],
    computed: {
      ...mapState('api', ['isAjax']),
      ...mapGetters('auth', ['canSave']),
      isDisabled () {
        if (!this.canSave) return true
        if (this.disabled || this.isAjax) return true

        return false
      }
    },
    methods: {
      onSave () {
        this.$emit('on-save')
      }
    }
  }
</script>
