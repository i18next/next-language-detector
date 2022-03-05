import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import i18nextConfig from '../next-i18next.config'

export const getI18nPaths = () =>
  i18nextConfig.i18n.locales.map((lng) => ({
    params: {
      locale: lng
    }
  }))

export const getStaticPaths = () => ({
  fallback: false,
  paths: getI18nPaths()
})

export async function getI18nProps(ctx, ns = ['common']) {
  const locale = ctx?.params?.locale
  let props = {
    ...(await serverSideTranslations(locale, ns))
  }
  return props
}

export function makeStaticProps(ns = [], opt = {}) {
  return async function getStaticProps(ctx) {
    const props = await getI18nProps(ctx, ns)
    if (opt.emptyI18nStoreStore) {
      // let the client fetch the translations
      props._nextI18Next.initialI18nStore = null
    }
    return {
      props
    }
  }
}
