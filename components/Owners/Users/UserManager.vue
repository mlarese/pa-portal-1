<template>
    <v-container fluid>
        <ShareListDialog
            :show="showShareDialog"
            :adapter="adapter"
            @cancel="hideShareDialog"
        />

        <v-layout row wrap>
            <div class="headline">{{$t('Users')}}</div>
            <v-spacer></v-spacer>

            <v-btn v-if="canAdd" dark color="indigo lighten-1" to="/owners/users/add"   class="elevation-0 text-upper">
                {{$t('Add user')}}
            </v-btn>

            <v-menu
                    v-if="canShare"
                    origin="center center"
                    transition="scale-transition"
                    bottom
            >
                <v-btn slot="activator" class="elevation-0 text-upper"   color="indigo lighten-1" dark  >
                    {{$t('Share list')}}
                </v-btn>
                <v-list >
                    <v-list-tile v-for="(item, i) in shareMenuItems" :key="i" @click="">
                        <v-list-tile-title @click="onShowShareList(item.adapter)">
                            {{ $t(item.title) }}
                        </v-list-tile-title>
                    </v-list-tile>
                </v-list>
            </v-menu>

        </v-layout>

        <v-layout class="mb-3"><UserFilter/></v-layout>

        <div class="title mb-2">{{$t('Filter users according to accepted regulations')}}</div>
        <v-layout class="mb-4"><TreatmentsFilter/></v-layout>
        <v-layout row wrap>
            <v-flex xs12>
                <!-- GridSearchBar/ -->
                <UsersGrid/>
            </v-flex>

        </v-layout>


    </v-container>
</template>
<script>
  import TreatmentsFilter from '../Treatments/TreatmentsFilter'
  import UserFilter from './UserFilter'
  import UsersGrid from './UsersGrid'
  import ShareListDialog from './ShareListDialog'
  import GridSearchBar from './GridSearchBar'
  import {mapActions, mapState, mapGetters} from 'vuex'
  import _values from 'lodash/values'

  let module = 'owners/users'
export default {
    name: 'UserManager',
    methods: {
      ...mapActions(module, ['searchList']),
      onShowShareList (adapter) {
        this.adapter = adapter
        this.showShareDialog = true
      },
      onSearch () {
        this.exportFilter.treatments = _values(this.exportFilter.treatments).filter(o => o.selected)
        this.searchList(this.exportFilter)
      },
      hideShareDialog () {
        this.showShareDialog = false
      }
    },
    computed: {
      ...mapState(module, ['exportFilter']),
      ...mapGetters('auth', ['canAdd', 'canShare'])
    },
    data () {
      return {
        selectedExportMenuItem: null,
        showShareDialog: false,
        toggleTemporaryFilter: 1,
        adapter: 'csv',
        shareMenuItems: [
          {title: 'Csv Export', adapter: 'csv'},
          {title: 'Mailone Export', adapter: 'mailone'},
          {title: 'Mailup Export', adapter: 'mailup'}
        ]
      }
    },
    components: {GridSearchBar, ShareListDialog, TreatmentsFilter, UserFilter, UsersGrid}
  }
</script>
