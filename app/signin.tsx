import { ThemeContext } from "@/contexts/ThemeContext";
import { useContext, useEffect, useState } from "react"
import { View, TouchableOpacity, Text } from "react-native"
import { CommonStyles } from "@/constants/CommonStyles";
import { useNavigation } from "expo-router";
import { TextInput } from "react-native-paper";
import Ionicons from 'react-native-vector-icons/Ionicons'
import GoogleAuth from "@/components/auth/GoogleAuth";
import * as SecureStore from 'expo-secure-store';
import { UserContext } from "@/contexts/UserContext";

const SignIn = () => {

  // State
  const navigation = useNavigation();
  const theme = useContext(ThemeContext);
  const [isInProgress, setIsInProgress] = useState<boolean>(false);

  // Context
  const userContext = useContext(UserContext);

    /* const [username, setUsername] = useState<string | undefined>(undefined);
    const [password, setPassword] = useState<string | undefined>(undefined);
    const [passwordVisible, setPasswordVisible] = useState<boolean>(false); */

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
        <View style={[CommonStyles.StackScreenContainer, CommonStyles.signinContainer, {backgroundColor: theme.background2}]}>

            <View style={CommonStyles.signinElement}>
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