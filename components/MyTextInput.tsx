import React from "react";
import { TextInputProps } from "react-native";
import styled from "styled-components/native";

interface MyTextInputProps extends TextInputProps {
    text: string;
    setText: (text: string) => void;
}

export const MyTextInput: React.FC<MyTextInputProps> = ({ text, setText, ...props }) => {
    return (
        <InputStyle
            value={text}
            onChangeText={setText}
            {...props} // Passa todas as outras props para o TextInput (como placeholder, secureTextEntry, etc.)
        />
    );
};

export const InputStyle = styled.TextInput`
  width: 100%;
  height: 50px;
  border: 0.2px solid black;
  border-radius: 7px;
  background-color: #F2F2F2;
  padding-left: 10px;
  padding-right: 10px;
  font-size: 18px;
`