import { useTranslation } from 'next-i18next'
import { getStaticPaths, makeStaticProps } from '../../lib/getStatic'

import { Header } from '../../components/Header'
import { Footer } from '../../components/Footer'

import Link from '../../components/Link'

const Homepage = () => {
  const { t, ready } = useTranslation(['common', 'footer'])
  if (!ready) return 'loading translations...'

  return (
    <>
      <main>
        <Header heading={t('h1')} title={t('title')} />
        <div>
          <Link href='/second-page'>
            <button
              type='button'
            >
              {t('to-second-page')}
            </button>
          </Link>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default Homepage

const getStaticProps = makeStaticProps(['common', 'footer'], { emptyI18nStoreStore: true })
export { getStaticPaths, getStaticProps }
