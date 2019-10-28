import Vue from 'vue'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)

export default (p1) => {
  let locale = p1.store.state.app.locale
  if (p1.query.lang) {
    locale = p1.query.lang
  } else if (p1.query.language) {
    locale = p1.query.language
  } else if (p1.query.lg) {
    locale = p1.query.lg
  }
  console.log('current locale = ' + locale)
  p1.app.i18n = new VueI18n({
    locale,
    fallbackLocale: 'en',
    messages: {
      'de': require('~/locales/de.json'),
      'en': require('~/locales/en.json'),
      'it': require('~/locales/it.json')
    }
  })
}
