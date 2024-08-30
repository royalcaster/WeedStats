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
import config from '@/auth0-configuration';

//--------------------------------------------------------------------------
//  SETUP
//--------------------------------------------------------------------------
/* SplashScreen.preventAutoHideAsync(); */

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
  const [appIsReady, setAppIsReady] = useState<boolean>(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Load fonts
        Font.loadAsync('PoppinsBold', require('../assets/fonts/Poppins-Bold.ttf'));
        Font.loadAsync('PoppinsMedium', require('../assets/fonts/Poppins-Medium.ttf'));

        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        
      }
    }
    prepare();
  }, []);

  // Theme & Font
  const theme = useContext(ThemeContext);

  return (
      <View style={{flex: 1, backgroundColor: theme.background2}}>
        <ThemeContext.Provider value={Colors.dark}>
          <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: theme.background2,
            },
            headerTintColor: 'white',
            headerTitleStyle: {
              fontFamily: 'PoppinsBold',
            },
            headerShadowVisible: false
          }}>
            <Stack.Screen name="index" options={{title: "Sign in"}}/>
            <Stack.Screen name="signup" options={{title: "Create account", animation: "fade_from_bottom"}}/>
          </Stack>
        </ThemeContext.Provider>
      </View>
  )
}
