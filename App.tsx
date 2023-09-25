import React from 'react';
import AppContent from './src/AppContent';
import { AuthProvider } from './src/hooks/useAuth';
import { ThemeProvider } from './src/contexts/themeContext';

const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
