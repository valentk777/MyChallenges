import React from 'react';
import AppContent from './src/AppContent';
import { AuthProvider } from './src/hooks/useAuth';
import { ThemeProvider } from './src/contexts/themeContext';
import { TranslationProvider } from './src/hooks/useTranslations';

const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <TranslationProvider>
        <AppContent />
        </TranslationProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
