<template>
    <v-container row  class="role-table">
            <table class="bzz">

                <tr class="css">
                    <th colspan="3" align="left" class="pl-2">{{$t('Permissions')}}</th>
                    <th style="width:70px"  class="css color">
                        {{$t('View')}}

                    </th>
                    <th style="width:70px"  class="css color">{{$t('Edit')}}</th>
                    <th style="width:70px"  class="css color">{{$t('Add')}}</th>
                    <th style="width:70px"  class="css color">{{$t('Delete')}}</th>
                    <th style="width:70px"  class="css color">{{$t('Export')}}</th>
                </tr>

                <tr>
                    <td class="" colspan="7">{{$t('Terms')}}</td>

                </tr>
                <tr v-for="(term, i) in terms" :key="term.uid" class="css">
                    <td class="text-xs-left css" colspan="3">{{term.name}}</td>
                    <td class="css"><input style="" :disabled="true" type="checkbox" v-model="aclCurrentRole.canSave" ></td>
                    <td class="css"> <input :disabled="true" type="checkbox" v-model="aclCurrentRole.canSave" ></td>
                    <td class="css"> <input :disabled="true" type="checkbox" v-model="aclCurrentRole.canAdd" ></td>
                    <td class="css"> <input :disabled="true" type="checkbox" v-model="aclCurrentRole.canSave" ></td>
                    <td class="css"> <input :disabled="true" type="checkbox" v-model="aclCurrentRole.canShare" ></td>
                </tr>

                <tr>
                    <td class="text-xs-left" colspan="3">{{$t('Treatments')}}</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                </tr>
                <tr v-for="(treatment, i) in treatments" :key="treatment.code">
                    <td class="text-xs-left css" colspan="3">{{treatment.name}}</td>

                    <td class="css"><input :disabled="true" type="checkbox" v-model="aclCurrentRole.canSave" ></td>
                    <td class="css"><input :disabled="true" type="checkbox" v-model="aclCurrentRole.canSave" ></td>
                    <td class="css"><input :disabled="true" type="checkbox" v-model="aclCurrentRole.canAdd" ></td>
                    <td class="css"><input :disabled="true" type="checkbox" v-model="checkboxWriteStatus" ></td>
                    <td class="css"> <input :disabled="true" type="checkbox" v-model="aclCurrentRole.canShare" ></td>
                </tr>
                <tr>
                    <td colspan="3" class="">{{$t('Users')}}</td>
                    <td class="css">
                        <input :disabled="true" type="checkbox" v-model="aclCurrentRole.canDo">
                        <div v-if="!aclCurrentRole.canSeeNoAgreement">
                            ({{$t('Limitata')}})
                        </div>
                    </td>
                    <td class="css"><input :disabled="true" type="checkbox" v-model="aclCurrentRole.canSaveUserData"></td>
                    <td class="css"><input :disabled="true" type="checkbox" v-model="aclCurrentRole.canAddUser"></td>
                    <td class="css"><input :disabled="true" type="checkbox" v-model="aclCurrentRole.canSaveUserData"></td>
                    <td class="css"> <input :disabled="true" type="checkbox" v-model="aclCurrentRole.canShare" ></td>
                </tr>


            </table>

    </v-container>
</template>
<script>
  import {mapState, mapGetters} from 'vuex'
  export default {
    computed: {
      ...mapGetters('auth', [
        'aclByRole',
        'canSave',
        'canSeeNoAgreementPrivacies',
        'canSave',
        'canAdd',
        'canShare',
        'canSeeAllUserData',
        'canAddUser',
        'canExportUserData',
        'canSaveUserData',
        'canSaveUserFlags',
        'canSeeUserAttachments',
        'canManageOperators'
      ]),
      ...mapState('owners/operators', ['$record', 'record', 'roles']),
      ...mapState('terms', {'terms': 'list'}),
      ...mapState('treatments', {'treatments': 'list'}),
      aclCurrentRole () {
        if (!this.$record.role) return {}
        return this.aclByRole(this.$record.role)
      }
    },
    watch: {
      '$record.role' () {
        if (this.$record.role === 'incharge') {
          this.checkboxUsersReadStatus = false
          this.checkboxWriteStatus = false
        } else {
          this.checkboxUsersReadStatus = true
          this.checkboxWriteStatus = true
        }
      }
    },
    data () {
      return {
        checkboxUsersReadStatus: true,
        checkboxWriteStatus: true,
        checkboxReadStatus: true,
        checkbox: true
      }
    },
    created () {
      if (this.$record.role === 'incharge') {
        this.checkboxUsersReadStatus = false
        this.checkboxWriteStatus = false
      } else {
        this.checkboxUsersReadStatus = true
        this.checkboxWriteStatus = true
      }
    }
  }
</script>

<style lang="scss">
    table.bzz {border-collapse: collapse;}
    .role-table {
        .css {
            margin:0;
            padding: 10px;
            text-align: center;
            font-size:12px;
            border: 1px solid gray;
        }
        .color{
            color: gray;
        }

    }

    .container {
        display: block;
        position: relative;
        padding-left: 35px;
        margin-bottom: 12px;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }
</style>
