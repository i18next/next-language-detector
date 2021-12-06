interface CookieOptions {
  maxAge?: number;
  expires?: Date;
  httpOnly?: boolean;
  path?: string;
  domain?: string;
  secure?: boolean;
  sameSite?: boolean | 'lax' | 'strict' | 'none';
}

interface DetectorOptions {
  /**
   * order and from where user language should be detected
   */
  order?: Array<
    'querystring' | 'cookie' | 'sessionStorage' | 'localStorage' | 'navigator' | 'htmlTag' | string
  >;

  /**
   * keys or params to lookup language from
   */
  lookupQuerystring?: string;
  lookupCookie?: string;
  lookupSessionStorage?: string;
  lookupLocalStorage?: string;
  lookupFromPathIndex?: number;
  lookupFromSubdomainIndex?: number;

  /**
   * cache user language on
   */
  caches?: string[];

  /**
   * languages to not persist (cookie, localStorage)
   */
  excludeCacheFor?: string[];

  /**
   * optional expire for set cookie
   * @default 10
   */
  cookieMinutes?: number;

  /**
   * optional domain for set cookie
   */
  cookieDomain?: string;

  /**
   * optional cookie options
   */
  cookieOptions?: CookieOptions

  /**
   * optional htmlTag with lang attribute
   * @default document.documentElement
   */
  htmlTag?: HTMLElement | null;
}

interface InitOptions extends DetectorOptions {
  fallbackLng?: string;
  supportedLngs: Array<string>;
}

interface LanguageDetector {
  cache?(lng: string, options: DetectorOptions): void;
  detect(options: DetectorOptions): string | undefined;
}
export default function LanguageDetector(options: InitOptions): LanguageDetector
