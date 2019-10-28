import {mapMutations, mapGetters, mapState, mapActions} from 'vuex'
import FileAttachmentManager from '../components/General/FileAttachment/FileAttachmentManager'
import Cookies from 'js-cookie'
import {getSchema} from '../assets/helpers'

export const attachmentsHandler = (namespace) => {
  return {
    components: {
      FileAttachmentManager
    },
    methods: {
      ...mapActions('owners/users', ['downloadAttachment']),
      ...mapMutations('owners/users', ['removeAttachment', 'blankAttachments', 'addAttachments']),
      onAfterUpload (files) {
        this.addAttachments(files)
      },
      onDownloadAttachment (i) {
        let token = this.$auth.getToken(getSchema())
        let atoken = token.split('bearer ')

        if (atoken.length > 0) {
          token = atoken[1]
        } else {
          alert(this.$t('Error'))
          return
        }
        Cookies.set('token', token)

        this.downloadAttachment({i, privacyUid: this.privacyUid})
      },
      onDeleteAttachment (i) {
        if (!confirm(this.$t('Do you confirm?'))) return
        this.removeAttachment(i)
      }
    },
    computed: {
      ...mapState('owners/users', ['attachments', '$attachments']),
      ...mapGetters('owners/users', ['attachmentList'])
    }
  }
}
