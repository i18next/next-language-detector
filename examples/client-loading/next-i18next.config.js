const LocizeBackend = require('i18next-locize-backend/cjs')
const ChainedBackend= require('i18next-chained-backend').default
const LocalStorageBackend = require('i18next-localstorage-backend').default

// If you've configured caching for your locize version, you may not need the i18next-localstorage-backend and i18next-chained-backend plugin.
// https://docs.locize.com/more/caching

const isBrowser = typeof window !== 'undefined'

module.exports = {
  // debug: true,
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'de', 'it'],
  },
  backend: {
    backendOptions: [{
      expirationTime: 60 * 60 * 1000 // 1 hour
    }, {
      projectId: '0842ada9-1d1d-4d48-ab27-08f6a132f558',
      version: 'latest'
    }],
    backends: isBrowser ? [LocalStorageBackend, LocizeBackend]: [],
  },
  serializeConfig: false,
  use: isBrowser ? [ChainedBackend] : []
}
