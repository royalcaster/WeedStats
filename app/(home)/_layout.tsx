//--------------------------------------------------------------------------
//  IMPORTS
//--------------------------------------------------------------------------
// React
import { useContext, useEffect, useState, useCallback } from 'react';
import 'react-native-reanimated';
import { View, Text, Image } from 'react-native';

// Expo
import { useFonts } from 'expo-font';
import * as Font from 'expo-font';
import { Stack, Tabs } from 'expo-router';
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
import Ionicons from 'react-native-vector-icons/Ionicons';

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
    <Tabs 
      screenOptions={{
        tabBarActiveTintColor: theme.palette4[0],
        tabBarActiveBackgroundColor: theme.background2,
        tabBarInactiveTintColor: theme.text,
        tabBarInactiveBackgroundColor: theme.background2,
        tabBarStyle: {
          height: 70,
          backgroundColor: theme.background2,
          borderColor: theme.background2,
          shadowColor: theme.background2,
          paddingBottom: 5
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: 'PoppinsMedium',
        },
        headerTitleStyle: {
          fontSize: 25,
          fontFamily: 'PoppinsBold',
        },
        headerShadowVisible: false,
        headerBackgroundContainerStyle: {
          borderWidth: 0,
        },
        headerTintColor: theme.text,
        headerStyle: {
          backgroundColor: theme.background2,
        }
      }}>
      <Tabs.Screen
        name="index"
        
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => {
            return focused ?
            <Image 
              source={require("../../assets/images/logo.png")}
              style={{width: 50, height: 50}}
            />
            :
            <Image 
              source={require("../../assets/images/logo_bw.png")}
              style={{width: 50, height: 50}}
            />
          },
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Einstellungen',
          tabBarIcon: ({ color, focused }) => focused ? 
          <Ionicons size={28} name="settings-sharp" color={color} />
          :
          <Ionicons size={28} name="settings-outline" color={color} />,
        }}
      />
    </Tabs>
  );
}
