
<template>
    <v-container>

        <v-layout row wrap class="align-center">

            <!-- v-icon class="mr-3" large color="green">check_circle</v-icon>
            <div class="title">{{$t('pref_save_success')}}</div -->

            <v-flex xs12 class="align-center headline">
                {{$t('dbloptin.done')}}!
            </v-flex>
            <v-flex xs12 class="align-center my-2">
                <v-icon large color="blue lighten-2">thumb_up</v-icon>
            </v-flex>

            <v-flex xs12 class="align-center body-1">
                <b>{{$t('dbloptin.dataconfirmed')}}</b>
            </v-flex>

            <v-flex xs12 class="align-center body-1  my-2">
                {{$t('dbloptin.follow_your_instructions')}}
            </v-flex>

            <v-flex xs12 class="align-center body-1">
                <b>{{$t('dbloptin.thanks')}}</b>
            </v-flex>

            <v-flex xs12 class="align-center body-1 my-2">
                {{$t('dbloptin.showdetails')}}
            </v-flex>

            <v-flex xs12 class="align-center body-1 my-2">
                <v-btn
                        style="text-transform: uppercase"
                        dark color="blue lighten-2"
                        @click="showDetail=!showDetail"
                        class="elevation-0">{{$t('dbloptin.viewdetail')}}</v-btn>
            </v-flex>


        </v-layout>

        <v-layout row wrap class="align-center">
            <UserFormTerms
                    v-if="showDetail"
                    read-only="true"
                    :allow-all="false"
                    :show-smart-bar="false"
                    :multi-privacy="false"
            ></UserFormTerms>

        </v-layout>



    </v-container>
</template>

<script>
  import UserFormTerms from '../Users/UserFormTerms'

  export default {
    components: {UserFormTerms},
    data () {
      return {
        showDetail: false
      }
    },
    name: 'ConfirmDeferred'
  }
</script>
