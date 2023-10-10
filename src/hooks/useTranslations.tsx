import React, { ProviderProps, createContext, useContext, useEffect, useState } from 'react';
import i18n, { USER_PREFERRED_LANGUAGE } from '../external/i18next';
import { format } from 'date-fns'
import { lt, enUS } from 'date-fns/locale'
import userService from '../services/userService';
import { useCurrentUser } from './useCurrentUser';
import { LocaleConfig } from 'react-native-calendars';
import { hourPickerLocales } from '../external/i18next/translations/hourPickerLocales';

const LOCALES = {
  lt,
  en: enUS,
}

interface ITranslationContext {
  currentLanguage: string;
  changeLanguage: (language: string) => Promise<void>;
  tTime: (date: string) => string;
};

const TranslationContext = createContext<ITranslationContext>({
  currentLanguage: USER_PREFERRED_LANGUAGE,
  changeLanguage: (language: string) => { },
  tTime: (date: string) => ""
});

interface TranslationContextProviderProps
  extends Omit<ProviderProps<ITranslationContext>, 'value'> {
}

const changeDatesInCalendar = (language: string) => {
  LocaleConfig.locales['en'] = hourPickerLocales['en'];
  LocaleConfig.locales['lt'] = hourPickerLocales['lt'];
  // LocaleConfig.locales['pt'] = hourPickerLocales['pt'];
  // LocaleConfig.locales['es'] = hourPickerLocales['es'];
  // LocaleConfig.locales['fr'] = hourPickerLocales['fr'];

  LocaleConfig.defaultLocale = language;
}

export const TranslationProvider = ({ children }: TranslationContextProviderProps) => {
  const user = useCurrentUser();
  const [currentLanguage, setCurrentLanguage] = useState(USER_PREFERRED_LANGUAGE)

  useEffect(() => {
    const getCurrentLanguageOrDefault = () => {
      if (user?.language == null || user?.language == undefined) {
        return;
      }

      i18n.changeLanguage(user.language);
      setCurrentLanguage(user.language);
      changeDatesInCalendar(user.language);
    }

    getCurrentLanguageOrDefault();
  }, [user]);

  const changeLanguage = async (language) => {
    i18n.changeLanguage(language);
    setCurrentLanguage(language);

    await userService.updateUserLanguage(language);
  }

  const tTime = (date: string) => {
    return format(new Date(date), 'PPPP', { locale: LOCALES[currentLanguage] });
  }

  return (
    <TranslationContext.Provider value={{ currentLanguage, changeLanguage, tTime }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslations = () => useContext(TranslationContext);
