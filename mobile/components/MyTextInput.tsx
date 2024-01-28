import {StyleSheet, TextInput, TextInputProps, View} from "react-native";
import {FontAwesome6} from "@expo/vector-icons";
import React from "react";

interface MyTextInputProps extends TextInputProps {
    text: string;
    setText: (text: string) => void;
    iconName: string;
}

export const MyTextInput: React.FC<MyTextInputProps> = ({text, setText, iconName, ...props}) => {
    return (
        <View style={styles.inputContainer}>
            {iconName && (
                <FontAwesome6 name={iconName} size={22} color={'gray'} style={{marginRight: 10}}/>
            )}
            <TextInput
                value={text}
                onChangeText={setText}
                {...props} // Passa todas as outras props para o TextInput (como placeholder, secureTextEntry, etc.)
                style={styles.inputStyle}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        width: '100%',
        height: 50,
        borderWidth: 0.2,
        borderColor: 'black',
        borderRadius: 7,
        backgroundColor: '#F2F2F2',
        paddingLeft: 15,
        paddingRight: 10,
        flexDirection: 'row', // Essencial para alinhar ícone e input horizontalmente
        alignItems: 'center', // Centraliza o ícone e o input verticalmente
    },

    inputStyle: {
        flex: 1,
        fontSize: 18,
    }
})