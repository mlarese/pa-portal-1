<template>
    <v-layout class="owner-user-form-layout" column>
        <v-flex xs12 class="blue-grey lighten-5 pa-3">
            <RemoveUserDialog :email="record.email" :show="showDeleteDialog"  @cancel="cancelUserDelete"/>
            <div class="title">
                <v-layout row wrap>
                    <v-flex xs6 class="pt-3">
                        {{$t('User data')}}
                    </v-flex>
                    <v-flex xs6  class="text-xs-right" v-if="canSave">
                        <SmallEditSaveButtonBar
                                :edit-mode="formDataEdit"
                                :hide-cancel="false"
                                @delete="showDeleteDialog=true"
                                @save="onSave"
                                @cancel="onCancel"
                                @edit="formDataEdit=true"/>

                    </v-flex>
                </v-layout>

            </div>


            <v-form>
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-spacer></v-spacer>

                    </v-flex>

                    <v-flex xs12 sm6>
                        <v-text-field :disabled="!canSave || !formDataEdit" hide-details :rules="rules.surname" required  box :label="$t('Surname')" v-model="record.surname"/>
                    </v-flex>
                    <v-flex xs12 sm6>
                        <v-text-field :disabled="!canSave || !formDataEdit" hide-details :rules="rules.name" required  box :label="$t('Name')" v-model="record.name"/>
                    </v-flex>
                </v-layout>

                <v-layout row wrap>
                    <v-flex xs12 sm6>
                        <v-text-field hide-details :rules="rules.email" required :disabled="true" box :label="$t('Email')" v-model="record.email"/>
                    </v-flex>
                    <v-flex xs12 sm6>
                        <v-text-field :disabled="!canSave || !formDataEdit" hide-details  box :label="$t('Telephone')" v-model="record.telephone"/>
                    </v-flex>
                </v-layout>

                <v-layout row wrap>
                    <v-flex xs12>
                        <v-text-field
                                :disabled="!canSave || !formDataEdit"
                                textarea
                                hide-details
                                box
                                :label="$t('Note')" v-model="record.note"/>
                    </v-flex>
                </v-layout>

                <v-layout row wrap>
                    <v-flex class="pa-0">
                        <slot name="bottom" :options="{formDataEdit}"></slot>
                    </v-flex>
                </v-layout>
            </v-form>

        </v-flex>

    </v-layout>
</template>
<script>
  // import _cloneDeep from 'lodash/cloneDeep'
  import {mapGetters, mapActions, mapState, mapMutations} from 'vuex'
  import RemoveUserDialog from './RemoveUserDialog'
  import SmallEditSaveButtonBar from '../../General/SmallEditSaveButtonBar'
  const module = 'owners/users'

  export default {
    data () {
      return {
        showDeleteDialog: false,
        record: {},
        formDataEdit: false,
        rules: {
          email: [
            v => !!v || this.$t('required'),
            v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,6})+$/.test(v) || this.$t('E-mail not valid')
          ],
          name: [v => !!v || this.$t('required')],
          surname: [v => !!v || this.$t('required')]
        }
      }
    },
    methods: {
      ...mapActions(module, ['saveLastSubsriptionUserData', 'loadAttachments']),
      ...mapMutations(module, ['resetAttachments']),
      onSave () {
        let {id, name, surname, telephone, email, note} = this.getLastSubscription
        return this.saveLastSubsriptionUserData({id, data: {name, surname, telephone, email, note}})
          .then(() => { this.formDataEdit = false })
          .then(() => {
            let rec = this.list.find(o => { o.id = id })
            // console.log(id)
            // console.dir(rec)
            if (rec) {
              rec.name = name
              rec.surname = surname
              rec.telephone = telephone
            }
          })
      },
      onCancel () {
        this.resetAttachments()
        this.formDataEdit = false
      },
      cancelUserDelete () {
        this.showDeleteDialog = false
        // da definire cosa fare ---
      }
    },
    components: {
      RemoveUserDialog, SmallEditSaveButtonBar
    },
    computed: {
      ...mapState(module, ['list']),
      ...mapGetters(module, ['getLastSubscription', 'filterListByDate']),
      ...mapGetters('auth', ['canSave'])
    },
    created () {
      this.record = this.getLastSubscription
      if (this.record.id) {
        this.loadAttachments(this.record.id)
      }
    }
  }
</script>

<style lang="scss">
    .owner-user-form-layout {
        .input-group--text-field input:disabled {
            opacity: .3;
        }
    }

</style>
