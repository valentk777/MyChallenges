import AppContent from "./src/AppContent";
import { AuthProvider } from "./src/hooks/useAuth";
import { ThemeProvider } from "./src/hooks/useTheme";
import { TranslationProvider } from "./src/hooks/useTranslations";

const App = () => {
  return (
    <AuthProvider>
      <ThemeProvider>
        <TranslationProvider>
          <AppContent />
        </TranslationProvider>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
