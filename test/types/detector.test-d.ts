import languageDetector, { LanguageDetector } from '../../'
import { expectType } from 'tsd'

expectType<LanguageDetector>(languageDetector({ fallbackLng: 'en', supportedLngs: ['en', 'de'] }))
