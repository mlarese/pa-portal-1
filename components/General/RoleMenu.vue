<template>
    <v-flex class="role-menu">
        <nav-avatar/>
        <v-divider></v-divider>

        <v-expansion-panel class="elevation-1" >
            <v-expansion-panel-content :value="true" expand-icon="arrow_drop_down">
                <div slot="header" class="text--darken-4 bold caption">Privacy Protection System</div>
                <DataOneRoleMenu :privacyMenu="privacyMenu"/>
            </v-expansion-panel-content>

            <v-expansion-panel-content :value="false" expand-icon="arrow_drop_down" v-if="hasBi">
                <div dark slot="header" class="text--darken-4 bold caption">Business Intelligence</div>
                <BiRoleMenu :privacyMenuBi="privacyMenuBi" v-if="userHasBi"/>
            </v-expansion-panel-content>

        </v-expansion-panel>
    </v-flex>
</template>
<script>
  import {mapGetters} from 'vuex'
  import NavAvatar from './NavAvatar'
  import BiRoleMenu from './BiRoleMenu'
  import DataOneRoleMenu from './DataOneRoleMenu'

  export default {
    name: 'RoleMenu',
    methods: {
      goTo (item) {
        const {path} = item
        this.$router.push({path})
      }
    },
    components: {
      DataOneRoleMenu,
      BiRoleMenu,
      NavAvatar
    },
    computed: {
      ...mapGetters('app', ['privacyMenu', 'privacyMenuBi', 'userHasBi']),
      ...mapGetters('auth', ['hasBi'])
    }
  }
</script>

<style lang="scss">
    .expansion-panel__header {
        background: #efefef;
    }
    .role-menu {
        .list__tile__action {
            min-width: 28px;
        }

        .list__tile--active {
            background: #f4f4f4;

        }
    }
</style>
