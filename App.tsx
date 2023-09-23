import React from 'react';
import AppContent from './src/AppContent';
import { AuthProvider } from './src/hooks/useAuth';
import { ThemeProvider } from './src/contexts/themeContext';
import authManager from './src/external/auth/authManager';

const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider authManager={authManager}>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
