<template>
    <v-container class="users-form" grid-list-md>
        <v-layout row class="title">{{$t('Operator data')}}</v-layout>

        <ChangePasswordDialog
                :user-id="$record.id"
                :show="showChangePwdDialog"
                @cancel="showChangePwdDialog=false"
        />

        <v-form v-model="form.valid" ref="form">
            <v-layout row>
                <v-flex xs12 sm6>
                    <v-text-field
                            box
                            :label="$t('Name')"
                            _rules="rules.name"
                            required
                            v-model="$record.firstName"/>
                </v-flex>
                <v-flex xs12 sm6>
                    <v-text-field
                            box
                            :label="$t('Surname')"
                            required
                            :rules="rules.surname"
                            v-model="$record.lastName"/>
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex xs12 sm6>
                    <v-text-field
                            box
                            :label="$t('Email')"
                            v-model="$record.email"/>
                </v-flex>
                <v-flex xs12 sm6>
                    <div  v-if="!isAddMode">

                        <v-btn   class="elevation-0" color="info" @click="showChangePwdDialog=true">
                            {{$t('Change password')}}
                        </v-btn>
                    </div>
                </v-flex>
            </v-layout>

            <v-card class="mb-2">
                <v-layout row  v-if="isAddMode" class="pa-3">
                    <v-flex xs12 sm6>
                        <v-text-field
                                required
                                :rules="rules.user"
                                :label="$t('User')"
                                box
                                v-model="$record.user" />
                    </v-flex>
                    <v-spacer></v-spacer>
                    <v-flex xs12 sm6>
                        <v-text-field
                                box
                                required
                                :rules="rules.password"
                                v-model="$record.password"
                                name="input-10-2"
                                :label="$t('Enter your password')"
                                :hint="$t('At least 8 characters')"
                                min="8"
                                :append-icon="pwdVisibilityToggler ? 'visibility' : 'visibility_off'"
                                :append-icon-cb="() => (pwdVisibilityToggler = !pwdVisibilityToggler)"
                                value=""
                                :type="pwdVisibilityToggler ? 'password' : 'text'"/>
                    </v-flex>
                </v-layout>

            </v-card>


        </v-form>
    </v-container>
</template>

<script>
  import {mapState, mapGetters} from 'vuex'
  import ChangePasswordDialog from '../../General/ChangePasswordDialog'
  export default {
    components: {
      ChangePasswordDialog
    },
    data () {
      return {
        showChangePwdDialog: false,
        pwdVisibilityToggler: true,
        rules: {
          name: [v => !!v || this.$t('required')],
          surname: [v => !!v || this.$t('required')],
          email: [
            v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,6})+$/.test(v) || this.$t('E-mail not valid')
          ]
        }
      }
    },
    computed: {
      ...mapState('customerCare', ['$record', 'record', 'form']),
      ...mapGetters('customerCare', ['isAddMode', 'isEditMode', 'isView'])
    },
    created () {
      if (this.isAddMode) {
        this.rules['password'] = [
          v => !!v || this.$t('required'),
          v => (v.length >= 8) || this.$t('At least 8 characters')
        ]
        this.rules['user'] = [v => !!v || this.$t('required')]
      }
    }
  }
</script>
