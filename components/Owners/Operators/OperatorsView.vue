<template>
    <v-container pa-0 class="operators-view">
        <v-layout row>
            <v-flex xs4 class="mx-2 my-2 title">{{$record.name}} {{$record.surname}}</v-flex>
            <v-flex xs4 class="title my-2">ID:{{$record.id}}</v-flex>
            <v-flex xs6 class="title my-2">{{$t('Role')}}:{{$record.role}}</v-flex>
            <v-flex xs2><v-btn flat small color="black">
                <v-icon>delete</v-icon>
                {{$t('Eliminate Operator')}}
            </v-btn></v-flex>
        </v-layout>
        <v-layout row wrap style="border-bottom: 2px solid black">
            <v-flex xs4 class="btn-back">
                <v-btn :disabled="!canSave" flat small class="mx-0" to="/owners/operators">
                    <v-icon>reply</v-icon>
                    {{$t('Back')}}
                </v-btn>
            </v-flex>
        </v-layout>
        <operators-user-view/>
        <operators-accessibility-view/>
        <operators-role-view/>
    </v-container>
</template>

<script>
  import OperatorsUserView from './OperatorsUserView'
  import OperatorsRoleView from './OperatorsRoleView'
  import OperatorsAccessibilityView from './OperatorsAccessibilityView'
  import {mapState, mapGetters} from 'vuex'
  export default {
    computed: {
      ...mapState('owners/operators', ['$record', 'record', 'periods']),
      ...mapGetters('auth', ['canSave'])
    },
    components: {
      OperatorsUserView,
      OperatorsRoleView,
      OperatorsAccessibilityView
    }
  }
</script>

<style>

</style>
