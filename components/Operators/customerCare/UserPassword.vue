<template>
    <v-card>
        <v-layout row class="pa-3">
            <v-flex xs12 sm5>
                <v-text-field
                        required
                        :rules="rules.user"
                        :label="$t('User')"
                        box
                        v-model="$record.user"/>
            </v-flex>
            <v-spacer></v-spacer>
            <v-flex xs12 sm5>
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
</template>
<script>
  import {mapState, mapGetters} from 'vuex'
  export default {
    name: 'UserPassword',
    data () {
      return {
        pwdVisibilityToggler: true
      }
    },
    props: ['rules'],
    computed: {
      ...mapState('owners', ['$record'])
    }
  }
</script>
