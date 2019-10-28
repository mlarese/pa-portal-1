<template>
    <v-container class="page py-1" >
        <v-card style="border-bottom: 1px solid lightgrey">
            <v-layout row wrap class="px-4 py-0">
                <v-flex xs12 sm4 class="py-0">
                    <v-select
                        :disabled="!canSave || !page.phantom"
                        class="page-domain-select"
                        :label="$t('Domain')"
                        :items="list"
                        item-value="name"
                        item-text="name"
                        v-model="page.domain"

                        required
                    />
                </v-flex>
                <v-flex xs12 sm6 class="py-0">
                    <v-text-field
                            :disabled="!canSave || !page.phantom"
                            v-model="page.page"
                            required
                            box
                            :label="$t('Page')"></v-text-field>
                </v-flex>

                <v-flex xs12 sm2 class="text-xs-center">
                    <cancel-btn :disabled="!canSave" @click="onDelete"  color="grey darken-1"/>

                </v-flex>
            </v-layout>


        </v-card>
    </v-container>
</template>

<script>
  import {mapState, mapGetters} from 'vuex'
  import CancelBtn from '../../General/CancelBtn'
  import ConfirmationButton from '../../General/ConfirmationButton'

  export default {
    name: 'Page',
    methods: {
      onDelete () {
        if (!confirm(this.$t('Do you confirm?'))) { return }
        if (this.page.phantom) {
          this.$record.pages.splice(this.index, 1)
        } else {
          this.page.deleted = true
        }
      }
    },
    components: {
      CancelBtn,
      ConfirmationButton
    },
    computed: {
      ...mapState('domains', ['list']),
      ...mapState('terms', ['$record']),
      ...mapGetters('auth', ['canSave']),
      page () {
        return this.$record.pages[this.index]
      }
    },
    props: ['index']
  }
</script>

<style lang="scss">
    .page-domain-select.input-group--dirty {
        label {
            top: 24px !important;
            left:4px;
        }
    }


</style>
