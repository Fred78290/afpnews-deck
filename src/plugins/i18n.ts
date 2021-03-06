import Vue from 'vue'
import VueI18n from 'vue-i18n'
import { Locale } from '@/types'

Vue.use(VueI18n)

const locales = ['en', 'fr']
const fallbackLocale = locales[0]

const messages = {
  [fallbackLocale]: require(`@/locales/${fallbackLocale}`)
}

const defaultDateTimeFormats = {
  [fallbackLocale]: messages[fallbackLocale].dateTimeFormats
}

function getNavigatorLanguage () {
  const language = navigator.language && navigator.language.substring(0, 2)
  if (language && locales.includes(language)) {
    return language
  }
  return false
}

const i18n = new VueI18n({
  locale: getNavigatorLanguage() || fallbackLocale,
  fallbackLocale,
  messages,
  dateTimeFormats: defaultDateTimeFormats
})

function setI18nLanguage (lang: Locale): Locale {
  i18n.locale = lang
  const htmlDocument = document.querySelector('html')
  if (htmlDocument) {
    htmlDocument.setAttribute('lang', lang)
  }
  return lang
}

export async function loadLanguageAsync (lang: Locale): Promise<Locale> {
  if (i18n.locale !== lang || !i18n.messages[lang]) {
    const importedMessages = await import(/* webpackChunkName: "lang-[request]" */ `@/locales/${lang}.json`)
    const { dateTimeFormats, ...rest } = importedMessages.default
    i18n.setLocaleMessage(lang, rest)
    i18n.setDateTimeFormat(lang, dateTimeFormats)
    return setI18nLanguage(lang)
  }
  return setI18nLanguage(lang)
}

export default i18n
