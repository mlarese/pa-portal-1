<template>
    <div class="users-information-table">
        {{privacy}}
                <template v-for="p in privacy">
                    <table class="mb-4">
                        <tbody>
                            <tr><td colspan="3">{{p.name}}</td></tr>

                            <tr>
                                <th v-for="col in headers">{{col}}</th>
                            </tr>

                            <tr v-for="v in values">
                                <td v-for="col in v">
                                    {{col}}
                                </td>
                            </tr>

                        </tbody>
                    </table>

                </template>

    </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  export default {
    name: 'UsersInformationTable',
    props: ['privacy'],
    computed: {
      ...mapGetters('privacy', ['flatPrivacy']),
      flatRecord () {
        return this.flatPrivacy(this.privacy)
      },
      headers () {
        return this.flatRecord.columns
      },
      values () {
        return this.flatRecord.values
      }
    }
  }
</script>

<style lang="scss">
    .users-information-table {
        table {
            width: 100%;
            border: 0px solid silver;
            border-collapse: collapse;
        }
        td,th {
            border: 1px solid silver;
            padding: 3px;
        }
    }
</style>