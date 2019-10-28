<template>
    <v-layout class="owner-user-form pt-0" column >
        <v-layout row wrap>
            <v-flex xs12 class="btn-back" pt-0>
                <v-tooltip right>
                    <v-btn :disabled="!canSave" slot="activator" fab flat small class="mx-0" :to="to" active-class="">
                        <v-icon>reply</v-icon>
                    </v-btn>
                    <span>{{$t('Back')}}</span>
                </v-tooltip>

            </v-flex>
        </v-layout>
        <v-layout row wrap>
            <v-flex xs12 class="mb-3" >
                <UserFormData>
                    <div slot="bottom"  slot-scope="{options}">
                        <FileAttachmentManager
                                :edit-mode="options.formDataEdit"
                                :end-point="apiEndpoint"
                                @after-upload="onAfterUpload"
                                @delete-attachment="onDeleteAttachment"
                                @download-attachment="onDownloadAttachment"
                                :attachements-object="$attachments"
                        ></FileAttachmentManager>

                    </div>
                </UserFormData>
            </v-flex>

            <v-flex xs12 >
                 <UserFormTerms :allow-all="true" class="grey lighten-3" :show-smart-bar="canSave" />
            </v-flex>


        </v-layout>
    </v-layout>

</template>
<script>
  import UserFormTerms from './UserFormTerms'
  import UserFormData from './UserFormData'
  import {mapState, mapGetters} from 'vuex'
  import {apiEndpoint} from '../../../storeimp/api/endpoint'
  import {attachmentsHandler} from '../../../mixins/attachments'

  export default {
    name: 'UserForm',
    mixins: [attachmentsHandler('owners/users')],
    data () {
      return {
        apiEndpoint: null
      }
    },
    created () {
      this.apiEndpoint = `${apiEndpoint}/user/attachmentupd/${this.getLastSubscription.id}`
    },
    computed: {
      ...mapState('owners/users', ['attachments', '$attachments']),
      ...mapGetters('owners/users', ['attachmentList', 'getLastSubscription', 'getLastSubscription']),
      ...mapGetters('auth', ['canSave']),
      privacyUid () {
        return this.getLastSubscription.id
      }
    },
    props: {
      to: {default: '/owners/users'}
    },
    components: {
      UserFormData, UserFormTerms
    }
  }
</script>

<style lang="scss">
</style>
