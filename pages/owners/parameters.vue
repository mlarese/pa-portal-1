<template>
    <div>
        <parameters-manager />
    </div>
</template>
<script>
  import Vue from 'vue'
  import {mapState} from 'vuex'
  import _cloneDeep from 'lodash/cloneDeep'
  import ParametersManager from '../../components/Owners/Parameters/ParametersManager'

  const root = {root: true}
  export default {
    fetch ({store}) {
      const {user} = store.state.auth
      const id = user.ownerId
      store.commit('owners/setEditMode', null, root)
      store.dispatch('owners/load', {id}, root)
    },
    computed: {
      ...mapState('owners', ['$record']),
      ...mapState('app', ['languages'])
    },
    components: {
      ParametersManager
    },
    created () {
      // debugger // eslint-disable-line

      if (!this.$record.profile) {
        this.$record.profile = {}
      }

      if (!this.$record.profile.languages) {
        Vue.set(this.$record.profile, 'languages', _cloneDeep(this.languages))
      }
    }
  }
</script>
