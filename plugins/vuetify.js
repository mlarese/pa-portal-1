import Vue from 'vue'
import colors from 'vuetify/es5/util/colors'
import Notifications from 'vue-notification'
import {dmy, time, dmySt} from '../assets/filters'
import VueClipboards from 'vue-clipboards'
import VueUpload from '@websanova/vue-upload/src/index'

import {
  Vuetify,
  VSpeedDial,
  VMenu,
  VDivider,
  VApp,
  VDialog,
  VCard,
  VNavigationDrawer,
  VDatePicker,
  VFooter,
  VList,
  VBtn,
  VIcon,
  VGrid,
  VBadge,
  VBreadcrumbs,
  VBtnToggle,
  VToolbar,
  VExpansionPanel,
  VForm,
  VTextField,
  VAlert,
  VDataTable,
  VSelect,
  VProgressLinear,
  VSubheader,
  VRadioGroup,
  VTabs,
  VAvatar,
  VSwitch,
  VToolTip,
  VCheckbox
} from 'vuetify'
import VuePlaceAutocomplete from 'vue-place-autocomplete'

Vue.use(VuePlaceAutocomplete)
Vue.use(VueClipboards)

Vue.use(Vuetify, {
  theme: {
    primary: colors.indigo.darken3,
    secondary: colors.grey.darken1,
    accent: colors.shades.black,
    error: colors.red.accent3
  },
  components: {
    VApp,
    VBadge,
    VExpansionPanel,
    VBtnToggle,
    VBreadcrumbs,
    VDivider,
    VDialog,
    VSpeedDial,
    VMenu,
    VCard,
    VNavigationDrawer,
    VFooter,
    VList,
    VBtn,
    VIcon,
    VGrid,
    VToolbar,
    VForm,
    VTextField,
    VSubheader,
    VProgressLinear,
    VDatePicker,
    VAlert,
    VDataTable,
    VRadioGroup,
    VTabs,
    VSelect,
    VAvatar,
    VSwitch,
    VToolTip,
    VCheckbox
  }
})

Vue.use(Notifications)
Vue.use(VueUpload)

Vue.filter('dmy', dmy)
Vue.filter('time', time)
Vue.filter('dmySt', dmySt)
