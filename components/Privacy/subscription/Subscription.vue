<template>
    <v-container color="white">
        <v-card flat class="pa-3" color="white" v-if="hasError">
            <v-layout>
                <v-flex class="title">{{$t('Invalid request')}}!!!</v-flex>
            </v-layout>
        </v-card>
        <v-card flat class="pa-3" color="white" v-if="!hasError">
            <subscription-title @unsubscribe-all="onUnsubscribeAll" :name="$record.name" :surname="$record.surname"  :domain="$record.domain" />

            <UserFormTerms v-bind="$attrs" :allow-all="false" :show-smart-bar="false"></UserFormTerms>

            <v-card-actions class="text-xs-center">
                <v-btn class="text-upper elevation-0" color="info" small v-if="hasNewsLetters" @click="onUnsubNewsletters">
                    {{$t('unsubscribe newsletters')}}
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-container>
</template>

<script>
  import UserFormTerms from '../../Owners/Users/UserFormTerms'
  import SubscriptionTitle from './SubscriptionTitle'
  import SubscriptionDynaForm from './SubscriptionDynaForm'
  import SubscriptionFixedForm from './SubscriptionFixedForm'
  import SubscriptionRecap from './SubscriptionRecap'
  import SubscriptionTermEditor from './SubscriptionTermEditor'
  import _isEmpty from 'lodash/isEmpty'
  import {mapState, mapGetters, mapActions} from 'vuex'

  export default {
    name: 'Subscription',
    created () {
      if (this.$route.query.lang) this.$i18n.locale = this.$route.query.lang
    },
    methods: {
      ...mapActions('owners/users', ['unsubscribeAll', 'unsubscribeNewsletters']),
      onUnsubNewsletters () {
        if (!confirm(this.$t('Do you confirm?'))) {
          return
        }

        this.unsubscribeNewsletters()
          .then(() => {
            this.$router.replace('/surfer/unnewslettersdone')
          })
      },
      onUnsubscribeAll () {
        if (!confirm(this.$t('Do you confirm?'))) {
          return
        }

        this.unsubscribeAll()
          .then(() => {
            this.$router.replace('/surfer/unallrequestsent')
          })
      }
    },
    computed: {
      ...mapState('api', ['hasError']),
      ...mapState('owners/users', ['recordList']),
      ...mapGetters('owners/users', {'$record': 'getLastSubscription', 'hasNewsLetters': 'hasNewsLettersTermsDomainObject'}),
      hasPrivacies () {
        return !_isEmpty(this.recordList)
      }
    },
    components: {
      SubscriptionTitle,
      SubscriptionDynaForm,
      SubscriptionFixedForm,
      SubscriptionRecap,
      SubscriptionTermEditor,
      UserFormTerms
    }
  }
</script>

<style scoped>

</style>
