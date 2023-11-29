import path from 'path'

/** @type {import("next-i18next").UserConfig} */
const config = {
  debug: process.env.NODE_ENV === 'development',
  reloadOnPrerender: process.env.NODE_ENV === 'development',
  i18n: {
    locales: ['en', 'vi'],
    defaultLocale: 'vi',
  },
  localePath: path.resolve('./public/locales'),
  localeStructure: '{{lng}}/{{ns}}',
  defaultNS: 'common',
}
export default config
