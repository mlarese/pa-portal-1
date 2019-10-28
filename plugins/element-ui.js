import Vue from 'vue'
import {DatePicker, TimePicker} from 'element-ui'
import langEn from 'element-ui/lib/locale/lang/en'
import langIt from 'element-ui/lib/locale/lang/it'
import langFr from 'element-ui/lib/locale/lang/fr'
import langEs from 'element-ui/lib/locale/lang/es'
import langDe from 'element-ui/lib/locale/lang/de'
import {locale as lang} from '../assets/helpers'
import locale from 'element-ui/lib/locale'

// configure language
locale.use(langEn)
Vue.use(DatePicker)
Vue.use(TimePicker)

const languages = {
  'it': langIt,
  'en': langEn,
  'fr': langFr,
  'de': langDe,
  'es': langEs
}

export default ({app, store}) => {
  let curlang = lang
  locale.use(languages[curlang])
}
