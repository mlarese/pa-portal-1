<template>
    <v-container grid-list-sm>
        <v-layout column>
            <v-flex  xs12>
               <div class="title"> {{$auth.user.userName}}</div>
                <div class="">{{$t('User profile')}}</div>
            </v-flex>

            <v-card class="elevation-1 pa-4" style="min-height: 300px;">
               <v-layout row wrap>
                   <v-flex xs12 sm6>
                       <v-text-field   box :disabled="true" v-model="$auth.user.user" :label="$t('User')"/>

                   </v-flex>
                   <v-flex xs12 sm6>
                       <v-text-field  box :disabled="true" v-model="$auth.user.userName" :label="$t('User name')"/>

                   </v-flex>
               </v-layout>


                <v-layout row wrap>
                    <v-flex xs12 class="text-xs-center">
                        <ChangePasswordDialog
                                :user-id="$auth.user.userId"
                                :show="showChangePwdDialog"
                                @cancel="showChangePwdDialog=false"
                        />
                        <v-btn  :disabled="!canSave" class="elevation-0" color="info" @click="showChangePwdDialog=true">
                            {{$t('Change password')}}
                        </v-btn>
                    </v-flex>

                </v-layout>


            </v-card>
        </v-layout>
    </v-container>
</template>
<script>
  import ChangePasswordDialog from '../../General/ChangePasswordDialog'
  import {mapGetters} from 'vuex'
  export default {
    components: {ChangePasswordDialog},
    data () {
      return {
        showChangePwdDialog: false
      }
    },
    computed: {
      ...mapGetters('auth', ['canSave'])
    },
    props: []
  }
</script>
