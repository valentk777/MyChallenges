import React, { ProviderProps, createContext, useContext, useState } from 'react';
import i18n, { USER_PREFERRED_LANGUAGE } from '../external/i18next';
import { format } from 'date-fns'
import { lt, enUS } from 'date-fns/locale'

const LOCALES = {
  lt,
  en: enUS,
}

interface ITranslationContext {
  currentLanguage: string;
  changeLanguage: (language: string) => void;
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

export const TranslationProvider = ({ children }: TranslationContextProviderProps) => {
  const [currentLanguage, setCurrentLanguage] = useState(USER_PREFERRED_LANGUAGE)

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
    setCurrentLanguage(language);
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
