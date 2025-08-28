import LanguageDetector from '../index.js'
import should from 'should'

describe('language detector', () => {
  describe('basic', () => {
    const ld = new LanguageDetector()
    describe('cookie', () => {
      after(() => {
        global.document = {
          cookie: ''
        }
      })

      it('detect', () => {
        global.document = {
          cookie: 'i18next=de-CH'
        }
        const lng = ld.detect()
        should(lng).eql('de-CH')
      })

      it('cacheUserLanguage', () => {
        global.document = {
          cookie: 'my=cookie'
        }
        ld.cache('it-IT', ['cookie'])
        should(global.document.cookie).match(/i18next=it-IT/)
        should(global.document.cookie).match(/Path=\//)
        // should(global.document.cookie).match(/my=cookie/)
      })
    })

    describe('querystring', () => {
      after(() => {
        global.window = {
          location: {
            pathname: '/some/route',
            search: ''
          }
        }
      })

      it('detect', () => {
        global.window = {
          location: {
            pathname: '/fr/some/route',
            search: '?lng=de'
          }
        }
        const lng = ld.detect()
        should(lng).eql('de')
      })
    })
  })

  describe('fallbackLng', () => {
    const ld = new LanguageDetector({ fallbackLng: 'fr', order: [] })

    const emulateLng = (l) => {
      global.window = {
        location: {
          search: `?lng=${l}`
        }
      }
    }

    it('should fallback correctly', () => {
      emulateLng('')
      const lng = ld.detect()
      should(lng).eql('fr')
    })
  })

  describe('supportedLngs', () => {
    const ld = new LanguageDetector({ fallbackLng: 'fr', supportedLngs: ['en', 'de', 'fr'] })

    const emulateLng = (l) => {
      global.window = {
        location: {
          search: `?lng=${l}`
        }
      }
    }

    it('should fallback correctly', () => {
      emulateLng('de-CH')
      const lng = ld.detect()
      should(lng).eql('de')
    })
  })
})
