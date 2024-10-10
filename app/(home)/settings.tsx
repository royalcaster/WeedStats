import { ThemeContext } from "@/contexts/ThemeContext";
import { useContext } from "react"
import { View, Text } from "react-native"
import { CommonStyles } from "@/constants/CommonStyles";
import Button from "@/components/common/Button";
import { router, useNavigation } from "expo-router";
import { UserContext } from "@/contexts/UserContext";
import { supabase } from "@/utils/supabase";

const Settings = () => {

    const navigation = useNavigation();
    const theme = useContext(ThemeContext);
    const userContext = useContext(UserContext);

    return (
        <View style={[CommonStyles.StackScreenContainer, {backgroundColor: theme.background2}]}>
            
            <Button 
                title="Abmelden"
                onPress={async () => {
                    const { error } = await supabase.auth.signOut();
                    if (error) {
                        console.error("Error when signing out: " + error);
                    }
                    else {
                        userContext.setUser(null);
                    }
                }}
                icon={null}
                borderradius={25}
                color={theme.background1}
                fontColor="white"
                hovercolor={"rgba(255,255,255,0.25)"}
                small={true}
            />

        </View>
    )
}

export default Settings