import { ThemeContext } from "@/contexts/ThemeContext";
import { useContext, useState } from "react"
import { View, Text, TouchableOpacity } from "react-native"
import { CommonStyles } from "@/constants/CommonStyles";
import Button from "@/components/common/Button";
import { router, useNavigation } from "expo-router";
import { TextInput } from "react-native-paper";
import { I18n } from "i18n-js";
import translations from "@/constants/languages";
import { getLocales } from "expo-localization";
import Ionicons from 'react-native-vector-icons/Ionicons'

const SignUp = () => {

    const navigation = useNavigation();
    const theme = useContext(ThemeContext);

    const [username, setUsername] = useState<string | undefined>(undefined);
    const [password, setPassword] = useState<string | undefined>(undefined);
    const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

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
                    title={"Create account"}
                    color={theme.palette4[0]}
                    hovercolor={"rgba(255,255,255,0.25)"}
                    borderradius={10}
                    onPress={() => router.push('./(home)')}
                    fontColor={theme.text}
                    icon={<Text>Icon</Text>}
                    small={true}
                    disabled={username === undefined || password === undefined}
                />
            </View>

        </View>
    )
}

export default SignUp