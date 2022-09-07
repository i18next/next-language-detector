# Introduction

[![Actions](https://github.com/i18next/next-language-detector/workflows/node/badge.svg)](https://github.com/i18next/next-language-detector/actions?query=workflow%3Anode)
[![npm version](https://img.shields.io/npm/v/next-language-detector.svg?style=flat-square)](https://www.npmjs.com/package/next-language-detector)

This package helps to handle language detection in Next.js when using static servers only.

>Error: i18n support is not compatible with next export. See here for more info on deploying: https://nextjs.org/docs/deployment

If this error message sounds familiar to you, this module may help.

# Getting started

Source can be loaded via [npm](https://www.npmjs.com/package/next-language-detector).

```bash
# npm package
$ npm install next-language-detector
```

## Usage:

**A complete example can be found [here](https://github.com/i18next/next-language-detector/tree/main/examples/basic).**

**And for a step by step guide please have a look at [this tutorial](https://locize.com/blog/next-i18n-static/).**

```js
// lngDetector.js
import languageDetector from 'next-language-detector'
import i18nextConfig from '../next-i18next.config'

export default languageDetector({
  supportedLngs: i18nextConfig.i18n.locales,
  fallbackLng: i18nextConfig.i18n.defaultLocale
})
```

```js
// redirect.js
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import lngDetector from './lngDetector'

export const useRedirect = (to) => {
  const router = useRouter()
  to = to || router.asPath

  // language detection
  useEffect(() => {
    const detectedLng = lngDetector.detect()
    if (to.startsWith('/' + detectedLng) && router.route === '/404') {
      router.replace('/' + detectedLng + router.route)
      return
    }

    lngDetector.cache(detectedLng)
    router.replace('/' + detectedLng + to)
  })

  return <></>
}
```

```js
// index.js
import { useRedirect } from '../lib/redirect';

export default function Redirect() {
  useRedirect();
  return <></>;
};
```
