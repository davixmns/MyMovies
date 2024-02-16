import styled from "styled-components/native";
import React from "react";

export const MyButton =({title, onPress, disabled} : {title: string, onPress: () => void, disabled: boolean}) => {
    return (
        <MyButtonStyle onPress={onPress} disabled={disabled}>
            <MyButtonText>{title}</MyButtonText>
        </MyButtonStyle>
    )
}

const MyButtonStyle = styled.TouchableOpacity`
  width: 100%;
  height: 50px;
  background-color: ${props => props.disabled ? 'grey' : '#3797EF'};
  border-radius: 7px;
  justify-content: center;
  align-items: center;
`

const MyButtonText = styled.Text`
  font-size: 18px;
  color: white;
  font-weight: bold;
`