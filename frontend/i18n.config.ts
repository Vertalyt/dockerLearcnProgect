import { defaultLocale, languages } from './i18n/index'

export default defineI18nConfig(() => ({
    legacy: false,
    locale: defaultLocale,
    fallbackLocale: 'en',
    messages: Object.assign(languages),
    lazy: true
  }))