<template>
    <v-container class="role-operator">
        <v-layout row class="ma-3 title">{{$t('Role Operator')}}</v-layout>
        <v-layout row justify-right>
            <v-flex xs12 sm3>
                <v-select
                        v-if="!isOwner"
                        :disabled="!canSave"
                        :items="validRoles"
                        item-value="text"
                        v-model="$record.role"
                        :label="$t('Role')"

                >
                    <template slot="selection" slot-scope="data">
                        {{$t(data.item.text)}}
                    </template>

                    <template slot="item" slot-scope="data">
                        {{$t(data.item.text)}}
                    </template>

                </v-select>

                <div v-if="isOwner" class="ml-3">
                    {{$t($record.role)}}
                </div>

            </v-flex>
        </v-layout>
            <v-flex xs12>
                <RoleTable></RoleTable>
            </v-flex>
        <v-layout>

        </v-layout>
    </v-container>
</template>

<script>
  import {mapState, mapGetters} from 'vuex'
  import RoleTable from '../Acl/RoleTable/RoleTable'

  export default {
    name: 'OperatorsRoleForm',
    components: {
      RoleTable
    },
    computed: {
      ...mapState('owners/operators', ['$record', 'record', 'roles']),
      ...mapGetters('auth', ['canSave']),
      ...mapGetters('owners/operators', ['validRoles', 'isOwner'])
    }
  }
</script>

<style>

</style>
