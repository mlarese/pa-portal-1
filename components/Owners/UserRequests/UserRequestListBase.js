import {mapState, mapActions} from 'vuex'

export default {
  methods: {
    ...mapActions('owners/userrequests', ['closeRequest', 'loadOpen', 'sendEmail']),
    onSendData (item) {
      if (!confirm(this.$t('Do i send user data') + ' ' + item.mail + '?')) {
        return
      }

      this.closeRequest(item.uid)
        .then(() => this.sendEmail({email: item.mail, id: item.uid}))
    }
  },
  computed: {
    ...mapState('owners/userrequests', ['list', 'search']),
    ...mapState('api', ['isAjax'])
  }
}
