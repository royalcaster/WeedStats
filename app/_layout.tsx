//--------------------------------------------------------------------------
//  IMPORTS
//--------------------------------------------------------------------------
// React
import { useContext, useEffect, useState, useCallback } from 'react';
import 'react-native-reanimated';
import { Alert, StatusBar, View } from 'react-native';

// Expo
import { useFonts } from 'expo-font';
import * as Font from 'expo-font';
import { Stack, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { getLocales } from 'expo-localization';
import * as SecureStore from 'expo-secure-store'

// Hooks
import { useColorScheme } from '@/hooks/useColorScheme';
import { ThemeContext } from '@/contexts/ThemeContext';
import { Colors } from '@/constants/Colors';

//Constants
import translations from '../constants/languages';

//3rd Party
import { I18n } from 'i18n-js';
import config from '@/auth0-configuration';
import { UserContext } from '@/contexts/UserContext';
import { supabase } from '@/utils/supabase';

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
  const [user, setUser] = useState<User | null>(null);
  const segments = useSegments();
  const router = useRouter();

  // Contexts
  const theme = useContext(ThemeContext);

  useEffect(() => {
    prepare();
    checkForSession()
    getUser()
  }, []);

  // Conditional rendering
  useEffect(() => {
    if (user == null) {
      console.log("Zum Signin screen!");
      router.replace('/signin');
    }
    else if (user && segments[0] == 'signin') {
      console.log("Zum Homescreen!");
      router.replace('/(home)/');
    }
  }, [user, segments]);

  // Load fonts and assets
  const prepare = async () => {
    try {
      Font.loadAsync('PoppinsBold', require('../assets/fonts/Poppins-Bold.ttf'));
      Font.loadAsync('PoppinsMedium', require('../assets/fonts/Poppins-Medium.ttf'));
      await StatusBar.setBarStyle('light-content');
    } catch (e) {
      console.warn(e);
    } finally {
      
    }
  }

  const checkForSession = async () => {
    const { data, error } = await supabase.auth.getSession()
    if (error) {
      // Session needs to be refreshed or created
      const { data, error } = await supabase.auth.refreshSession()
      const { session, user } = data
      if (user) {
        setUser({
          id: user.id || "",
          email: user?.email || ""
        })
      }
      console.log("Failed to get a valid session, refreshing...")
    }
  }

  const getUser = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      setUser({
        id: user.id || "",
        email: user?.email || ""
      })
    }
  }

  return (
      
    <View style={{flex: 1, backgroundColor: theme.background2}}>

      <UserContext.Provider value={{user: user, setUser: (user) => setUser(user)}}>
      <ThemeContext.Provider value={Colors.dark}>

        <Stack
        screenOptions={{
          headerShown: false,
          headerStyle: {
            backgroundColor: theme.background2,
          },
          headerTintColor: 'white',
          headerTitleStyle: {
            fontFamily: 'PoppinsBold',
          },
          headerShadowVisible: false
        }} />

      </ThemeContext.Provider>
      </UserContext.Provider>

    </View>
  )
}
