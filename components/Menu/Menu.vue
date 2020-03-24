<template>
    <v-list dense>
        <v-list-tile  v-for="(item, index) in menu" :key="index" @click="onClick(item)">
            <v-list-tile-action>
                <v-icon medium>arrow_right</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
                <v-list-tile-title style="font-size:16px">{{item.descr_modulo}}</v-list-tile-title>
            </v-list-tile-content>
        </v-list-tile>
    </v-list>
</template>
<script>
  import {mapState} from 'vuex'
  export default {
    components: {},
    props: [],
    methods: {
      onClick (item) {
        this.ui.drawerLeft = false
        this.ui.currentAppSrc = this.prepareLink(item)
        this.$router.push(`/app/mod_${item.id_module}`)
      },
      prepareLink (item) {
        const {descuser, iduser} = this.user
        const idente = this.enti[0].id_ente
        const url = `${item.gui_acl}?origin=${this.origin}&ente=${idente}&user=${iduser}&descuser=${descuser}`
        return url
      }
    },
    computed: {
      origin () {
        return 'javascript:parent.closeSubApp()'
      },
      ...mapState('auth', ['menu', 'user']),
      ...mapState('app', ['ui']),
      ...mapState('auth', ['enti'])
    }
  }
</script>
