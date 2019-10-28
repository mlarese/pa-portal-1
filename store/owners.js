import {mutations as m, actionsFn, state as s, getters as g} from '../factories/store'
import {email, required, length} from '../assets/formRules'
const moduleName = 'owner/profile'

export const actions = {
  ...actionsFn(moduleName),
  deactivate ({dispatch, commit}, id) {
    return dispatch('api/put', {url: `/customercare/deactivate/${id}`, options: {}}, {root: true})
  },
  activate ({dispatch, commit}, id) {
    return dispatch('api/put', {url: `/customercare/activate/${id}`, options: {}}, {root: true})
  },
  loadOwnerStat ({dispatch, commit}) {
    return dispatch('api/get', {url: `/owner/ownersstats`, options: {}}, {root: true})
      .then(resp => commit('setOwnersStat', resp.data))
  }
}

export const mutations = {
  ...m,
  addDomain (s) {
    s.$record.domains.push({name: '', _name: '', active: true, deleted: false, note: '', phantom: true})
  },
  removeDomain (s, index) {
    s.$record.domains.splice(index, 1)
  },
  setOwnersStat (s, payload) {
    s.ownersStat = payload
  }
}

export const state = () => ({
  ...s(),
  ownersStat: {},
  languages: [
    { text: 'en' },
    { text: 'it' },
    { text: 'fr' },
    { text: 'es' },
    { text: 'de' }
  ]
})

export const getters = {
  ...g,
  canAddDomain: (s) => (!s.$record || !s.$record.domains) ? true : s.$record.domains.filter(d => !d.name).length === 0,
  formRules: (s, g) => $t => {
    const lblRequired = $t('required')
    const lblEmail = $t('E-mail not valid')
    const lblPwd = $t('At least 8 characters')

    let rules = {
      language: [required(lblRequired)],
      company: [required(lblRequired)],
      email: [
        required(lblRequired),
        email(lblEmail)
      ],
      name: [required(lblRequired)],
      surname: [required(lblRequired)]
    }

    if (g.isAddMode) {
      rules['password'] = [
        required(lblRequired),
        length(lblPwd)
      ]
      rules['user'] = [required(lblRequired)]
    }

    return rules
  }
}
