import { ThemeContext } from "@/contexts/ThemeContext";
import { useContext } from "react"
import { View, Text } from "react-native"
import { CommonStyles } from "@/constants/CommonStyles";
import Button from "@/components/common/Button";
import { router, useNavigation } from "expo-router";
import { UserContext } from "@/contexts/UserContext";
import { supabase } from "@/utils/supabase";

const Home = () => {

    // State und Context
    const navigation = useNavigation();
    const theme = useContext(ThemeContext);
    const userContext = useContext(UserContext);

    return (
        <View style={[CommonStyles.StackScreenContainer, {backgroundColor: theme.background2}]}>
            
            <Text style={{color: "white"}}>Angemeldet als: {userContext.user?.email}</Text>

        </View>
    )
}

export default Home