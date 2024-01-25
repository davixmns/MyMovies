import styled from "styled-components/native";
import React from "react";

const MyButtonStyle = styled.TouchableOpacity`
  width: 100%;
  height: 50px;
  background-color: #3797EF;
  border-radius: 7px;
  justify-content: center;
  align-items: center;
`

const MyButtonText = styled.Text`
  font-size: 18px;
  color: white;
  font-weight: bold;
`

export const MyButton =({...props})=>{
    return (
        <MyButtonStyle {...props}>
            <MyButtonText>{props.children}</MyButtonText>
        </MyButtonStyle>
    )
}