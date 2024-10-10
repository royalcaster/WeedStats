import { StyleSheet } from "react-native";

export const CommonStyles = StyleSheet.create({
    StackScreenContainer: {
        flex: 1,
        padding: 15,
        flexDirection: "column"
    },
    signinContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: "center"
    },
    signinElement: {
        flex: 1,
        padding: 20,
        width: "100%",
        justifyContent: "center"
    },
    signInHeading: {
        color: "white",
        fontFamily: "PoppinsBold",
        fontSize: 40
    },
    signInText: {
        color: "white",
        fontFamily: "PoppinsMedium",
        fontSize: 18
    }
});