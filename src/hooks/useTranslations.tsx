import React, { ProviderProps, createContext, useContext, useEffect, useMemo, useState } from 'react';
import i18n, { USER_PREFERRED_LANGUAGE } from '../external/i18next';
import { format } from 'date-fns'
import { lt, enUS, lv, pt, es, fr } from 'date-fns/locale'
import userService from '../services/userService';
import { useCurrentUser } from './useCurrentUser';
import { LocaleConfig } from 'react-native-calendars';
import { hourPickerLocales } from '../external/i18next/translations/hourPickerLocales';

const LOCALES = {
  lt,
  en: enUS,
  lv,
  pt,
  es,
  fr,
}

interface ITranslationContext {
  currentLanguage: string;
  changeLanguage: (language: string) => Promise<void>;
  tTime: (date: string, timeFormat?: string) => string;
};

const TranslationContext = createContext<ITranslationContext>({
  currentLanguage: USER_PREFERRED_LANGUAGE,
  changeLanguage: (language: string) => { },
  tTime: (date: string, timeFormat = 'PPPP') => ""
});

interface TranslationContextProviderProps
  extends Omit<ProviderProps<ITranslationContext>, 'value'> {
}

const changeDatesInCalendar = (language: string) => {
  LocaleConfig.locales['en'] = hourPickerLocales['en'];
  LocaleConfig.locales['lt'] = hourPickerLocales['lt'];
  LocaleConfig.locales['pt'] = hourPickerLocales['pt'];
  LocaleConfig.locales['es'] = hourPickerLocales['es'];
  LocaleConfig.locales['fr'] = hourPickerLocales['fr'];
  LocaleConfig.locales['lv'] = hourPickerLocales['lv'];

  LocaleConfig.defaultLocale = language;
}

export const TranslationProvider = ({ children }: TranslationContextProviderProps) => {
  const user = useCurrentUser();
  const [currentLanguage, setCurrentLanguage] = useState(USER_PREFERRED_LANGUAGE)

  useEffect(() => {
    let currentLanguage = USER_PREFERRED_LANGUAGE;

    if (user?.language != null && user?.language != undefined) {
      currentLanguage = user.language;
    }

    setLanguage(currentLanguage);
  }, [user]);

  const setLanguage = (language: string) => {
    i18n.changeLanguage(language);
    setCurrentLanguage(language);
    changeDatesInCalendar(language);
  }

  const changeLanguage = async (language: string) => {
    setLanguage(language);

    await userService.updateUserLanguage(language);
  }

  const tTime = (date: string, timeFormat = 'PPPP') => {
    return format(new Date(date), timeFormat, { locale: LOCALES[currentLanguage] });
  }

  const values = useMemo(() => ({ currentLanguage, changeLanguage, tTime }), [currentLanguage]);

  return (
    <TranslationContext.Provider value={values}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslations = () => useContext(TranslationContext);
