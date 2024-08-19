import { ThemeContext } from "@/contexts/ThemeContext";
import { useContext } from "react"
import { View, Text } from "react-native"
import { CommonStyles } from "@/constants/CommonStyles";
import Button from "@/components/common/Button";
import { router, useNavigation } from "expo-router";

const Home = () => {

    const navigation = useNavigation();
    const theme = useContext(ThemeContext);

    return (
        <View style={[CommonStyles.StackScreenContainer, {backgroundColor: theme.background2}]}>
            
            <Text>HOMEasdasd</Text>

        </View>
    )
}

export default Home