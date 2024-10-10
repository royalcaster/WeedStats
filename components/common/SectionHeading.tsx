import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface SectionHeadingProps {
    text: string;
    color: string
}

const SectionHeading: React.FC<SectionHeadingProps> = ({ text, color }) => {
    return (
        <View style={styles.container}>
            <View style={[styles.line, {backgroundColor: color}]} />
            <Text style={[styles.text, {color: color}]}>{text}</Text>
            <View style={[styles.line, {backgroundColor: color}]} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    line: {
        flex: 1,
        height: 2,
        backgroundColor: 'black',
    },
    text: {
        marginHorizontal: 10,
        fontFamily: "PoppinsMedium",
        letterSpacing: 3,
        fontSize: 18
    },
});

export default SectionHeading;