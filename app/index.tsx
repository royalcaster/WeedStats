import { ThemeContext } from "@/contexts/ThemeContext";
import { useContext, useState } from "react"
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

//3rd Party
import { useAuth0 } from "react-native-auth0";

const SignIn = () => {

    const navigation = useNavigation();
    const theme = useContext(ThemeContext);
    const {authorize, clearSession, user, error, getCredentials, isLoading} = useAuth0();

    const [username, setUsername] = useState<string | undefined>(undefined);
    const [password, setPassword] = useState<string | undefined>(undefined);
    const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

    const handleLogin = () => {
        authorize({
            redirectUrl: 'com.royalcaster.WeedStats.auth0://dev-3l6d646lapzi5iqr.us.auth0.com/android/com.royalcaster.WeedStats/callback',
        });
    }

    const onLogin = async () => {
      try {
        await authorize({
            redirectUrl: 'com.royalcaster.WeedStats.auth0://dev-3l6d646lapzi5iqr.us.auth0.com/android/com.royalcaster.WeedStats/callback',
        });
        let credentials = await getCredentials();
        if (credentials) {
          Alert.alert('AccessToken: ' + credentials.accessToken);
        }
      } catch (e) {
        console.log(e);
      }
    };
    
    const loggedIn = user !== undefined && user !== null;
    
    const onLogout = async () => {
    try {
        await clearSession();
    } catch (e) {
        console.log('Log out cancelled');
    }
    };
    
    /* if (isLoading) {
    return <View style={CommonStyles.StackScreenContainer}><Text style={{color: "white"}}>Loading</Text></View>;
    } */
    

    return (
        <View style={[CommonStyles.StackScreenContainer, CommonStyles.signinContainer, {backgroundColor: theme.background2}]}>

            <View>
                {user && <Text>You are logged in as {user.name}</Text>}
                {!user && <Text>You are not logged in</Text>}
                {error && <Text>{error.message}</Text>}
            </View>

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
                <Button 
                    onPress={loggedIn ? onLogout : onLogin}
                    title={loggedIn ? 'Log Out' : 'Log In'}
                    color={theme.palette4[0]}
                    hovercolor={"rgba(255,255,255,0.25)"}
                    borderradius={10}
                    fontColor={theme.text}
                    icon={<Text>Icon</Text>}
                    small={true}
                    
                />
            </View>

            {/* <View style={CommonStyles.signinElement}>
                <Button 
                    title={"Create account"}
                    color={theme.background1}
                    hovercolor={"rgba(255,255,255,0.25)"}
                    borderradius={10}
                    onPress={() => router.push('/signup')}
                    fontColor={theme.text}
                    icon={<Text>Icon</Text>}
                    small={true}
                />
            </View> */}

        </View>
    )
}

export default SignIn