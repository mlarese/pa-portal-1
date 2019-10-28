<template>
    <v-toolbar dense class="py-0 px-4  elevation-1" color="white">
        <v-text-field

                :disabled="list.length == 0"
                v-model="search.localCriteria"
                append-icon="search"
                :label="$t('Filter result set')"
                single-line
                hide-details
        ></v-text-field>

    </v-toolbar>
</template>
<script>
  import {mapState, mapGetters} from 'vuex'
  const module = 'owners/users'
  export default {
    name: 'GridSearchBar',
    computed: {
      ...mapState(module, ['list', 'search', 'grid']),
      ...mapState('api', ['isAjax']),
      ...mapGetters('auth', ['canSave'])
    }
  }
</script>
