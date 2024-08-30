import { ThemeContext } from "@/contexts/ThemeContext";
import { useContext, useEffect, useState } from "react"
import { View, Text, TouchableOpacity, Alert } from "react-native"
import { CommonStyles } from "@/constants/CommonStyles";
import Button from "@/components/common/Button";
import { router, useNavigation } from "expo-router";
import { TextInput } from "react-native-paper";
import { I18n } from "i18n-js";
import translations from "@/constants/languages";
import { getLocales } from "expo-localization";
import Ionicons from 'react-native-vector-icons/Ionicons'
import config from '../auth0-configuration';
import { Linking } from "react-native";
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
  } from '@react-native-google-signin/google-signin';

  import {supabase} from '../utils/supabase';

const SignIn = () => {

    const [user, setUser] = useState<any>(null);
    const navigation = useNavigation();
    const theme = useContext(ThemeContext);
    const [isInProgress, setIsInProgress] = useState<boolean>(false);

    const EXPO_PUBLIC_GOOGLE_OAUTH_START_URL = process.env.EXPO_PUBLIC_GOOGLE_OAUTH_START_URL || "";

    const [username, setUsername] = useState<string | undefined>(undefined);
    const [password, setPassword] = useState<string | undefined>(undefined);
    const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

    useEffect(() => {

    },[]);

    GoogleSignin.configure({
        webClientId: '158741630717-2utkk8ue1hfn18v9q4kioo9q8id942jv.apps.googleusercontent.com', // client ID of type WEB for your server. Required to get the `idToken` on the user object, and for offline access.
      });

    return (
        <View style={[CommonStyles.StackScreenContainer, CommonStyles.signinContainer, {backgroundColor: theme.background2}]}>
            <View style={CommonStyles.signinElement}>
                <TextInput 
                    textContentType='username'
                    placeholder={"Username"}
                    style={{backgroundColor: theme.background1, borderTopLeftRadius: 10, borderTopRightRadius: 10}}
                    contentStyle={{color: theme.text}}
                    activeUnderlineColor={theme.palette4[0]}
                    placeholderTextColor={theme.text}
                    label={"Username"}   
                    value={username}
                    onChangeText={(text) => setUsername(text)}
                />
            </View>

            <View style={CommonStyles.signinElement}>
                <TextInput 
                    textContentType='password'
                    placeholder={"Password"}
                    style={{backgroundColor: theme.background1, borderTopLeftRadius: 10, borderTopRightRadius: 10}}
                    contentStyle={{color: theme.text}}
                    activeUnderlineColor={theme.palette4[0]}
                    placeholderTextColor={theme.text}
                    label={"Password"}   
                    value={password}
                    secureTextEntry={passwordVisible}
                    onChangeText={(text) => setPassword(text)}
                />
                <TouchableOpacity 
                    style={{height: 55, width: 50, position: "absolute", right: 0, top: 0, display: "flex", justifyContent: "center", alignItems: "center"}}
                    onPress={() => setPasswordVisible(!passwordVisible)}
                >
                    <Ionicons style={{fontSize: 20, color: theme.palette4[0]}} name={passwordVisible ? 'eye-outline' : 'eye-off-outline'}/>
                </TouchableOpacity>
            </View>
            
            <View style={CommonStyles.signinElement}>
            <GoogleSigninButton
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
                onPress={async () => {
                    try {
                        await GoogleSignin.hasPlayServices();
                        const userInfo = await GoogleSignin.signIn();
                        if (userInfo.idToken) {
                          const {data, error} = await supabase.auth.signInWithIdToken({
                            provider: 'google',
                            token: userInfo.idToken,
                          });
                          console.log(data, error);
                        }
                        else {
                          throw new Error("No idToken found");
                        }
                    } catch (error: any) {
                        if (error) {
                            console.debug(error.code);
                            switch (error.code) {
                              case statusCodes.SIGN_IN_CANCELLED:
                                // user cancelled the login flow
                                break;
                              case statusCodes.IN_PROGRESS:
                                // operation (eg. sign in) already in progress
                                break;
                              case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
                                // play services not available or outdated
                                break;
                              default:
                              // some other error happened
                            }
                          } else {
                            // an error that's not related to google sign in occurred
                          }
                    }
                }}
                disabled={isInProgress}
                />
            </View>

        </View>
    )
}

export default SignIn