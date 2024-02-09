import React from 'react';
import { TextInput, TextInputProps } from 'react-native';
import styled from 'styled-components/native';
import { FontAwesome6 } from '@expo/vector-icons';

interface MyTextInputProps extends TextInputProps {
    text: string;
    setText: (text: string) => void;
    iconName: React.ComponentProps<typeof FontAwesome6>['name'];
}

export const MyTextInput: React.FC<MyTextInputProps> = ({text, setText, iconName, ...props}) => {
    return (
        <InputContainer>
            {iconName && (
                <FontAwesome6 name={iconName} size={22} color={'gray'} style={{marginRight: 10}}/>
            )}
            <StyledTextInput
                value={text}
                onChangeText={setText}
                {...props} // Passa todas as outras props para o StyledTextInput
            />
        </InputContainer>
    );
};

// Styled Components
const InputContainer = styled.View`
    width: 100%;
    height: 50px;
    border-width: 1px;
    border-color: black;
    border-radius: 7px;
    background-color: #F2F2F2;
    padding-left: 15px;
    padding-right: 10px;
    flex-direction: row;
    align-items: center;
`;

const StyledTextInput = styled.TextInput`
    flex: 1;
    font-size: 18px;
`;
