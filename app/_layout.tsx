//--------------------------------------------------------------------------
//  IMPORTS
//--------------------------------------------------------------------------
// React
import { useContext, useEffect, useState, useCallback } from 'react';
import 'react-native-reanimated';
import { View } from 'react-native';

// Expo
import { useFonts } from 'expo-font';
import * as Font from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { getLocales } from 'expo-localization';

// Hooks
import { useColorScheme } from '@/hooks/useColorScheme';
import { ThemeContext } from '@/contexts/ThemeContext';
import { Colors } from '@/constants/Colors';

//Constants
import translations from '../constants/languages';

//3rd Party
import { I18n } from 'i18n-js';

//--------------------------------------------------------------------------
//  SETUP
//--------------------------------------------------------------------------
SplashScreen.preventAutoHideAsync();

// Set the key-value pairs for the different languages you want to support.
const i18n = new I18n(translations);

// Set the locale once at the beginning of your app.
i18n.locale = getLocales()[0].languageCode ?? 'en';
// When a value is missing from a language it'll fall back to another language with the key present.
i18n.enableFallback = true;

//--------------------------------------------------------------------------
//  COMPONENT START
//--------------------------------------------------------------------------
export default function RootLayout() {

  //States
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Load fonts
        Font.loadAsync('PoppinsBold', require('../assets/fonts/Poppins-Bold.ttf'));

        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  // Theme & Font
  const theme = useContext(ThemeContext);
  

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View style={{flex: 1}} onLayout={onLayoutRootView}>
      <ThemeContext.Provider value={Colors.dark}>
        <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.background1,
          },
          headerTintColor: 'white',
          headerTitleStyle: {
            fontFamily: 'PoppinsBold',
          },
        }}>
          <Stack.Screen name="index" options={{title: i18n.t('signin')}}/>
        </Stack>
      </ThemeContext.Provider>
    </View>
  );
}
