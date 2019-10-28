<template>
    <v-container class="users-form" >
        <v-layout row class="title">{{$t('Users Data')}}</v-layout>
        <v-form v-model="form.valid" ref="form">
            <v-layout row>
                <v-flex xs12 sm6>
                    <v-text-field
                            box
                            :label="$t('User')"
                            :rules="rules.user"
                            required
                            v-model="$record.user"/>
                </v-flex>
                <v-flex xs12 sm6>
                    <v-text-field
                            box
                            :label="$t('Name')"
                            :rules="rules.name"
                            required
                            v-model="$record.name"/>
                </v-flex>
            </v-layout>
            <v-layout row >
                <v-flex xs12 sm6>
                    <v-text-field
                            box
                            :rules="rules.password"
                            required
                            v-model="$record.password"
                            name="input-10-2"
                            :label="$t('Enter your password')"
                            hint="At least 8 characters"
                            min="8"
                            :append-icon="e2 ? 'visibility' : 'visibility_off'"
                            :append-icon-cb="() => (e2 = !e2)"
                            value=""
                            :type="e2 ? 'password' : 'text'"/>
                </v-flex>
            </v-layout>
            <v-flex xs12 sm2>
                <p>{{$t('Type')}}</p>
            </v-flex>
            <v-flex xs12 sm6>
                <v-select
                        :items="type"
                        :rules="rules.type"
                        required
                        item-value="text"
                        v-model="$record.type"
                        :label="$t('Type')"
                ></v-select>
            </v-flex>
        </v-form>
    </v-container>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    data () {
      return {
        e2: true,
        rules: {
          type: [v => !!v || this.$t('required')],
          name: [v => !!v || this.$t('required')],
          password: [v => !!v || this.$t('required')],
          user: [v => !!v || this.$t('required')]
        }
      }
    },
    computed: {
      ...mapState('operators/users', ['$record', 'record', 'form', 'type'])
    },
    props: []
  }
</script>

<style>

</style>
