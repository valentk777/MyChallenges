import i18n, {ModuleType} from 'i18next';

import {initReactI18next} from 'react-i18next';
import * as RNLocalize from 'react-native-localize';

import english from './translations/english.json';
import lithuanian from './translations/lithuanian.json';
import france from './translations/france.json';
import latvian from './translations/latvian.json';
import portuguese from './translations/portuguese.json';
import spanish from './translations/spanish.json';

export const USER_PREFERRED_LANGUAGE = RNLocalize.getLocales()[0].languageCode;

const MODULE_TYPE: ModuleType = 'languageDetector';

const LANGUAGE_DETECTOR = {
  async: true,
  cacheUserLanguage: () => {},
  detect: (cb: (code: string) => void) => {
    return cb(USER_PREFERRED_LANGUAGE);
  },
  init: () => {},
  type: MODULE_TYPE,
};

const RESOURCES = {
  en: english,
  lt: lithuanian,
  pt: portuguese,
  es: spanish,
  fr: france,
  lv: latvian,
};

i18n
  .use(LANGUAGE_DETECTOR)
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    compatibilityJSON: 'v3',
    resources: RESOURCES,
    // language to use if translations in user language are not available
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // not needed for react!!
    },
  });

export default i18n;
