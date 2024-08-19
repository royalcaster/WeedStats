//--------------------------------------------------------------------------
//  IMPORTS
//--------------------------------------------------------------------------
// React
import { useContext, useEffect, useState, useCallback } from 'react';
import 'react-native-reanimated';
import { View, Text } from 'react-native';

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
import translations from '../../constants/languages';

//3rd Party
import { I18n } from 'i18n-js';
import { CommonStyles } from '@/constants/CommonStyles';

//--------------------------------------------------------------------------
//  SETUP
//--------------------------------------------------------------------------

// Set the key-value pairs for the different languages you want to support.
const i18n = new I18n(translations);

//--------------------------------------------------------------------------
//  COMPONENT START
//--------------------------------------------------------------------------
export default function HomeLayout() {


  useEffect(() => {
    
  }, []);

  // Theme & Font
  const theme = useContext(ThemeContext);
  

  return (
    <View style={[CommonStyles.StackScreenContainer, {backgroundColor: theme.background2}]}>
      <Text>test</Text>
    </View>
  );
}
