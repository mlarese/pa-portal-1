import _has from 'lodash/has'
import {locale} from '../../../PhpstormProjects/mmoneprivacy/assets/helpers'
import dateFormat from 'date-fns/format'
import subMonths from 'date-fns/subMonths'

export const state = () => ({
  locale: locale,
  title: 'DataOne',
  biTitle: 'Business Intelligence',
  version: '1.1.3',
  debugMode: false,
  logFilter: {
    date_range: [dateFormat(subMonths(new Date(), 1), 'yyyy-MM-dd'), dateFormat(new Date(), 'yyyy-MM-dd')]
  },
  ui: {
    drawerRight: false,
    burgerRight: false
  },
  languages: [
    {id: 'it', label: 'ITA', active: true},
    {id: 'en', label: 'ENG', active: true},
    {id: 'de', label: 'DEU', active: true},
    {id: 'fr', label: 'FRA', active: true},
    {id: 'es', label: 'ESP', active: true},
    {id: 'ru', label: 'RUS', active: true},
    {id: 'hu', label: 'HUN', active: true},
    {id: 'pl', label: 'POL', active: true}
  ],
  comboLanguages: [
    {id: 'it', label: 'IT'},
    {id: 'en', label: 'EN'},
    {id: 'de', label: 'DE'},
    {id: 'fr', label: 'FR'},
    {id: 'es', label: 'ES'},
    {id: 'ru', label: 'RU'},
    {id: 'hu', label: 'HU'},
    {id: 'pl', label: 'PO'}
  ],
  privacyMenuBi: {
    guests: [],
    owners: [
      {
        title: 'Query Base',
        name: 'biqulastchkout',
        icon: 'view_list',
        path: '/bi/query/query',
        enabled: true,
        visible: false
      },
      // {
      //   title: 'Modelli predittivi',
      //   name: 'biqulastchkout',
      //   icon: 'view_list',
      //   path: '/bi/query/predict',
      //   enabled: false,
      //   visible: false
      // },
      {
        title: 'Rapporto età su nazione',
        name: 'bidashagenation',
        icon: 'dashboard',
        path: '/bi/dashboard/agenation',
        enabled: true,
        visible: true
      },
      {
        title: 'Rapporto demografico',
        name: 'bidashdemografic',
        icon: 'dashboard',
        path: '/bi/dashboard/demografic',
        enabled: true,
        visible: true
      },
      {
        title: 'Rapporto mese su annualità',
        name: 'bidashperiod',
        icon: 'dashboard',
        path: '/bi/dashboard/monthyear',
        enabled: true,
        visible: true
      },
      {
        title: 'Rapporto ritorni',
        name: 'bidashcomeback',
        icon: 'dashboard',
        path: '/bi/dashboard/returns',
        enabled: true,
        visible: true
      }
    ],
    operators: []
  },
  privacyMenu: {
    guests: [],
    owners: [
      {
        title: 'Terms',
        name: 'terms',
        icon: 'subject',
        path: '/owners/terms',
        enabled: true,
        visible: true
      },
      {
        title: 'Treatments',
        name: 'treatment',
        icon: 'playlist_add_check',
        path: '/owners/treatments',
        enabled: true,
        visible: true
      },
      {
        title: 'Users',
        name: 'users',
        icon: 'person',
        path: '/owners/users',
        enabled: true,
        visible: true
      },
      {
        title: 'Subscription list',
        name: 'subscriptions',
        icon: 'list',
        path: '/owners/subscriptions',
        enabled: true,
        visible: false
      },
      {
        title: 'Operators',
        name: 'operators',
        icon: 'account_circle',
        path: '/owners/operators',
        enabled: true,
        visible: true
      },
      {
        title: 'Profile',
        name: 'profile',
        icon: 'contact_mail',
        path: '/owners/profile',
        enabled: true,
        visible: true
      },
      {
        title: 'Config',
        name: 'config',
        icon: 'settings_applications',
        path: '/owners/parameters',
        enabled: true,
        visible: false
      }],
    operators: [

      {
        title: 'Owners',
        name: 'owners',
        icon: 'account_circle',
        path: '/operators/owners',
        enabled: true,
        visible: true
      },
      {
        title: 'Users',
        name: 'users',
        icon: 'person',
        path: '/operators/users',
        enabled: true,
        visible: false
      },
      {
        title: 'Customer care Operators',
        name: 'operators',
        icon: 'supervisor_account',
        path: '/operators/customercare',
        enabled: true,
        visible: true
      },
      {
        title: 'Logs Titolari',
        name: 'logstitolari',
        icon: 'list_alt',
        path: '/operators/ownerlogs/',
        enabled: true,
        visible: true
      },
      {
        title: 'Logs Operatori',
        name: 'logsoperatori',
        icon: 'list_alt',
        path: '/operators/operatorlogs/',
        enabled: true,
        visible: true
      },
      {
        title: 'Logs Accessi',
        name: 'logslogin',
        icon: 'list_alt',
        path: '/operators/logslogin/',
        enabled: true,
        visible: true
      }
    ]
  }

})

export const mutations = {
  setMenuPermissionByIndex (state, {canView, index}) {
    state.privacyMenuBi.owners[index].visible = canView
  },
  setMenuPermissions (state, {canSave}) {
    state.privacyMenu.owners[4].visible = canSave
  },
  setDrawerRight (state, payload) { state.ui.drawerRight = payload },
  setBurgerRight (state, payload) {
    state.ui.burgerRight = payload
  },
  setLocale (state, payload) {
    state.locale = payload
  },
  setTitle (state, payload) {
    state.title = payload
  },
  setLanguages (state, payload) {
    state.languages = payload
  },
  setMenu (state, payload) {
    state.menu = payload
  }
}

export const actions = {
}

export const getters = {
  role: (s, g, rs) => !_has(rs, 'auth.user.role') ? 'guest' : rs.auth.user.role,
  isOwner: (s, g) => g.role === 'owners',
  user: (s, g, rs) => !_has(rs, 'auth.user.user') ? '' : rs.auth.user.user,
  userName: (s, g, rs) => !_has(rs, 'auth.user.userName') ? '' : rs.auth.user.userName,
  privacyMenu: (s, g, rs) => s.privacyMenu[g.role],
  privacyMenuBi: (s, g, rs) => s.privacyMenuBi[g.role],
  userHasBi: (s, g, rs) => {
    if (!g.isOwner) return false
    return !_has(rs, 'auth.user.options.hasBi') ? false : rs.auth.user.options.hasBi
  },
  userHasPredictive: (s, g, rs) => {
    if (!g.isOwner) return false
    return !_has(rs, 'auth.user.options.hasPredictive') ? false : rs.auth.user.options.hasPredictive
  }
}
