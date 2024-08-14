// React
import { useContext, useEffect } from 'react';
import 'react-native-reanimated';
import { Text } from 'react-native';
// Expo
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';

// Hooks
import { useColorScheme } from '@/hooks/useColorScheme';
import { ThemeContext } from '@/contexts/ThemeContext';
import { Colors } from '@/constants/Colors';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {


  const colorScheme = useColorScheme();

  useEffect(() => {
    console.log(colorScheme);
  },[]);

  // Theme & Font
  const theme = useContext(ThemeContext);
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });


  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeContext.Provider value={colorScheme === "dark" ? Colors.dark : Colors.light}>
      <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.background1,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
        <Stack.Screen name="index" options={{title: 'Sign in'}}/>
      </Stack>
    </ThemeContext.Provider>
  );
}
