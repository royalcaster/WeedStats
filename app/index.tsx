import { ThemeContext } from "@/contexts/ThemeContext";
import { useContext } from "react"
import { View, Text } from "react-native"
import { CommonStyles } from "@/constants/CommonStyles";
import Button from "@/components/common/Button";
import { router, useNavigation } from "expo-router";

const SignIn = () => {

    const navigation = useNavigation();
    const theme = useContext(ThemeContext);

    return (
        <View style={[CommonStyles.StackScreenContainer, {backgroundColor: theme.background2}]}>
            
            <Button 
                title="Sign In"
                color={theme.palette4[0]}
                hovercolor={"rgba(255,255,255,0.25)"}
                borderradius={10}
                onPress={() => router.push('./(home)')}
                fontColor={theme.text}
                icon={<Text>Icon</Text>}
            />

        </View>
    )
}

export default SignIn