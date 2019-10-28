<template>
    <v-container grid-list-md>
        <v-form v-model="form.valid" ref="form" autocomplete="off">
        <v-layout row >
            <v-flex xs12 sm6>
                <v-text-field
                        :disabled="!canSave"
                        v-model="$record.name"
                        :label="$t('Name')"
                        box
                        :rules="rules.name"
                        required
                         />

            </v-flex>

            <v-flex xs12 sm6>
                <v-text-field
                        :disabled="!canSave"
                        box
                        v-model="$record.surname"
                        :label="$t('Surname')"
                        :rules="rules.surname"
                        required
                />

            </v-flex>

        </v-layout>

        <v-layout row>


            <v-flex xs12 sm6>
                <v-text-field
                        name="address"
                        :disabled="!canSave"
                        v-model="$record.address"
                        :label="$t('Address')"
                        box
                />
            </v-flex>

            <v-flex xs12 sm6>
                <v-text-field
                        name="zip"
                        :disabled="!canSave"
                        v-model="$record.zip"
                        :label="$t('Zip')"
                        box
                        />
            </v-flex>
        </v-layout>

        <v-layout row>

            <v-flex xs12 sm6>
                <v-text-field
                        name="city"
                        :disabled="!canSave"
                        v-model="$record.city"
                        :label="$t('City')"
                        box
                />
            </v-flex>




            <v-flex xs12 sm6>
                <v-text-field
                        :disabled="!canSave"
                        box
                        v-model="$record.email"
                        :label="$t('Email')"
                        :rules="rules.email"
                        required
                         />

            </v-flex>
        </v-layout>

        <v-layout  v-if="false">

            <v-flex xs12>
                <div class="input-group input-group--text-field input-group--dirty input-group--text-field-box primary--text">
                    <label>{{$t('Address')}}</label>
                    <div class="input-group__input">
                        <vue-google-autocomplete
                                style="width:100%"
                                name="gaddress"
                                autocomplete="off"
                                classname="form-control"
                               :placeholder="$t('Address')"
                                v-on:placechanged="getAddressData"
                        />
                    </div><div class="input-group__details"><!----></div></div>
            </v-flex>
        </v-layout>

        <v-layout row>
            <v-flex xs2 sm2 class="my-4" v-if="false">
                <v-subheader>
                    {{$t('Password')}} <br>
                    ***************
                </v-subheader>
            </v-flex>
            <v-flex xs4 sm4 class="my-4" v-if="false">
               <v-btn color="grey" :disabled="!canSave">
                  {{$t('Change password')}}
               </v-btn>

            </v-flex>

            <v-flex xs12 sm6>
                <v-text-field
                        :disabled="!canSave"
                        v-model="$record.telephone"
                        :label="$t('Telephone')"
                        box
                        />
            </v-flex>
        </v-layout>

            <v-card>
                <v-layout row  v-if="isAddMode" class="pa-3">
                    <v-flex xs12 sm5>
                        <v-text-field
                                :disabled="!canSave"
                                required
                                :rules="rules.user"
                                :label="$t('User')"
                                box
                                v-model="$record.user" />
                    </v-flex>
                    <v-spacer></v-spacer>
                    <v-flex xs12 sm5>
                        <v-text-field
                                :disabled="!canSave"
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
  import BtnCmds from '../../General/BtnCmds'
  import {mapState, mapGetters} from 'vuex'
  import UserPassword from '../../Operators/Owners/UserPassword'
  import {required, email} from '../../../assets/formRules'
  import VueGoogleAutocomplete from 'vue-google-autocomplete'

  export default {
    data () {
      return {
        completeAddress: null,
        pwdVisibilityToggler: true,
        rules: {
          name: [required(this.$t('required'))],
          surname: [required(this.$t('required'))],
          email: [email(this.$t('E-mail not valid'))]
        }
      }
    },
    computed: {
      ...mapState('owners/operators', ['$record', 'record', 'form']),
      ...mapGetters('owners/operators', ['isAddMode']),
      ...mapGetters('auth', ['canSave'])
    },
    components: {BtnCmds, UserPassword, VueGoogleAutocomplete},
    methods: {
      getAddressData (location) {
        let streetNumber = ''
        if (location.street_number) streetNumber = location.street_number
        this.$record.city = location.locality
        this.$record.zip = location.postal_code
        this.$record.address = location.route + ' ' + streetNumber
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
    }
  }
</script>

<style>
    .input-group--full-width input {
        width:100%;
        background: white;
        padding:7px;
        border:1px solid #e1e1e1;

    }
</style>
