<template>
  <v-container grid-list-xs fluid class="ma-0 pa-0">
      <v-layout row justify-center align-center wrap class="mb-2">
          <data-one-icon style="width: 310px; text-align: center; margin:auto; margin-top:15px;" />
      </v-layout>
      <v-layout row wrap class="ma-0 pa-0">
          <component :is="currentDashboard" />
      </v-layout>

  </v-container>
</template>

<script>
  import OwnerDashboard from '../components/Owners/OwnerDashboard'
  import CustomerCareDashboard from '../components/Operators/customerCare/CustomerCareDashboard'
  const root = {root: true}

  export default {
    computed: {
      currentDashboard () {
        if (this.$auth.user.role === 'owners') {
          return OwnerDashboard
        } else {
          return CustomerCareDashboard
        }
      }
    },
    components: {
      OwnerDashboard
    },
    fetch ({store}) {
      const {user} = store.state.auth
      if (user.role === 'owners') {
        const id = user.ownerId
        if (id !== 0) {
          store.commit('owners/setEditMode', null, root)
          store.dispatch('owners/load', {id, force: false}, root)
          store.dispatch('domains/load', {force: false}, root)
            .then(() => store.commit('domains/setLoaded', true, root))
        }
      } else if (user.role === 'operators') {
        // store.dispatch('domains/loadAll', {force: false}, root)
        // store.dispatch('owners/loadOwnerStat', {}, root)
      }

      return true
    }
  }
</script>
