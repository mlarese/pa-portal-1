<template>
    <v-container class="owners-form title" grid-list-md>

        <v-toolbar class="elevation-0" dense>
            <v-toolbar-title>{{$t('Owner Data')}}</v-toolbar-title>

            <v-spacer></v-spacer>
            <v-btn class="elevation-1" @click="openLayout">
                {{$t('Email layouts')}}
            </v-btn>
        </v-toolbar>
        <v-form v-model="form.valid" ref="form">

            <v-layout row >
                <v-flex xs12 sm6>
                    <v-text-field
                            required
                            :rules="rules.company"
                            :label="$t('Company')"
                            box
                            v-model="$record.company" />

                </v-flex>
                <v-spacer></v-spacer>
                <v-flex xs12 sm6>
                    <v-text-field
                            required
                            :rules="rules.email"
                            :label="$t('Email')"
                            box
                            v-model="$record.email"/>
                </v-flex>
            </v-layout>

            <v-layout row>
                <v-flex xs12 sm6>
                    <v-text-field
                            :label="$t('Name')"
                            :rules="rules.name"
                            required
                            box
                            v-model="$record.name" />
                </v-flex>
                <v-spacer></v-spacer>
                <v-flex xs12 sm6>
                    <v-text-field
                            :label="$t('Surname')"
                            :rules="rules.surname"
                            required
                            box
                            v-model="$record.surname"/>
                </v-flex>
            </v-layout>

            <v-layout row>
                <v-flex xs12 sm6>
                    <v-text-field  :label="$t('City')"   box   v-model="$record.city" />
                </v-flex>
                <v-spacer></v-spacer>
                <v-flex xs12 sm6>
                    <v-text-field :label="$t('Address')" box v-model="$record.address" />
                </v-flex>
            </v-layout>

            <v-layout row>
                <v-flex xs12 sm6>
                    <v-text-field  :label="$t('Zip')"   box  v-model="$record.zip" />
                </v-flex>
                <v-spacer></v-spacer>
                <v-flex xs12 sm6>
                    <v-text-field  :label="$t('County')"   box  v-model="$record.county" />
                </v-flex>
            </v-layout>

            <v-card>
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


            <v-layout row mt-2 class="align-baseline">
                <v-flex xs12 sm6>
                    <v-select
                            :items="languages"
                            required
                            :rules="rules.language"
                            item-value="text"
                            v-model="$record.language"
                            :label="$t('Language')"
                    />
                </v-flex>

                <v-flex xs12 sm6 class="">
                    <div  v-if="!isAddMode">

                        <v-btn   class="elevation-0" color="info" @click="openLayouts">
                            {{$t('Change password')}}
                        </v-btn>
                    </div>
                </v-flex>

            </v-layout>

        </v-form>
        <ChangePasswordDialog
                :user-id="$record.id"
                :show="showChangePwdDialog"
                @cancel="showChangePwdDialog=false"
        />
    </v-container>
</template>

<script>
  import {mapState, mapGetters} from 'vuex'
  import ChangePasswordDialog from '../../General/ChangePasswordDialog'

  export default {
    data () {
      let rules = {
        domain: [v => !!v || this.$t('required')],
        language: [v => !!v || this.$t('required')],
        company: [v => !!v || this.$t('required')],
        email: [
          v => !!v || this.$t('required'),
          v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,6})+$/.test(v) || this.$t('E-mail not valid')
        ],
        name: [v => !!v || this.$t('required')],
        surname: [v => !!v || this.$t('required')]
      }

      return {
        showChangePwdDialog: false,
        pwdVisibilityToggler: true,
        rules
      }
    },
    components: {
      ChangePasswordDialog
    },
    methods: {
      openLayouts () {
        alert(this.$record.id)
      }
    },
    created () {
      if (this.isAddMode) {
        this.rules['password'] = [
          v => !!v || this.$t('required'),
          v => (v.length >= 8) || this.$t('At least 8 characters')
        ]
        this.rules['user'] = [v => !!v || this.$t('required')]
      }
    },
    computed: {
      ...mapState('owners', ['$record', 'record', 'form', 'languages']),
      ...mapGetters('owners', ['isAddMode', 'isEditMode', 'isView'])
    }
  }
</script>
