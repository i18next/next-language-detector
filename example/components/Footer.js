import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import Link from 'next/link'
import pkg from 'next-i18next/package.json'

import i18nextConfig from '../next-i18next.config';

export const Footer = () => {
  const router = useRouter()
  const { t } = useTranslation('footer')

  return (
    <footer>
      <p>
        {t('description')}
      </p>
      <p>
        <span style={{ lineHeight: '4.65em', fontSize: 'small' }}>{t('change-locale')}</span>
        {i18nextConfig.i18n.locales.map((locale) => {
          if (locale === router.locale) return null;
          return (
            <Link
              href='/'
              locale={locale}
              key={locale}
            >
              <button style={{ fontSize: 'small' }}>
                {locale}
              </button>
            </Link>
          );
        })}
      </p>
      <p>
        next-i18next v
        {pkg.version}
      </p>
    </footer>
  )
}
