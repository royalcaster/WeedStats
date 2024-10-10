import { ThemeContext } from "@/contexts/ThemeContext";
import { useContext, useEffect, useState } from "react"
import { View, TouchableOpacity, Text, Image } from "react-native"
import { CommonStyles } from "@/constants/CommonStyles";
import { useNavigation } from "expo-router";
import { TextInput } from "react-native-paper";
import Ionicons from 'react-native-vector-icons/Ionicons'
import GoogleAuth from "@/components/auth/GoogleAuth";
import * as SecureStore from 'expo-secure-store';
import { UserContext } from "@/contexts/UserContext";
import SectionHeading from "@/components/common/SectionHeading";

const SignIn = () => {

  // State
  const navigation = useNavigation();
  const theme = useContext(ThemeContext);
  const [isInProgress, setIsInProgress] = useState<boolean>(false);

  // Context
  const userContext = useContext(UserContext);

    useEffect(() => {

    },[]);

    const saveAccessToken = async (accessToken: string, expiresAt: number) => {
      await SecureStore.setItemAsync('access_token', accessToken);
      await SecureStore.setItemAsync('expires_at', expiresAt.toString());
    }

    const saveRefreshToken = async (refreshToken: string) => {
        await SecureStore.setItemAsync('refresh_token', refreshToken);
      }

    return (
        <View style={[CommonStyles.StackScreenContainer, CommonStyles.signinContainer, {backgroundColor: theme.background2, flexDirection: "column"}]}>

            <View style={[CommonStyles.signinElement, {flex: 4}]}>
              <Image 
                source={require("../assets/images/icon.png")}
                style={{width: 100, height: 100}}
              />
              <View style={{height: 20}}></View>
              <Text style={CommonStyles.signInHeading}>Willkommen</Text>
              <Text style={CommonStyles.signInText}>WeedStats ist der tägliche Begleiter für jeden Cannabis-Liebhaber.</Text>
            </View>

            <View style={[CommonStyles.signinElement, {alignItems: "center"}]}>
                <SectionHeading text="LOSLEGEN" color={theme.palette4[0]} />
                <View style={{height: 20}}></View>
                <GoogleAuth 
                    saveAccessToken={(accessToken: string, expiresAt: number) => saveAccessToken(accessToken, expiresAt)}
                    saveRefreshToken={(refreshToken: string) => saveRefreshToken(refreshToken)}
                    setUser={(user: User) => userContext.setUser(user)}
                />
            </View>

        </View>
    )
}

export default SignIn