import styled from "styled-components/native";
import React, {useState} from "react";
import {BlurView} from "expo-blur";
import {View} from "react-native";

// @ts-ignore
//coloque 2 parametros, color e placeholder
export function WriteReviewButton({isActive, placeholder}) {
    const buttonColor = isActive ? 'rgba(55, 151, 239, 0.7)' : 'rgba(10, 10, 10, 0.5)'
    return (
        <View style={{overflow: 'hidden', borderRadius: 23}}>
            <BlurView intensity={20} style={{backgroundColor: buttonColor}}>
                <WriteReviewStyles>
                    <ButtonPlaceholder>{placeholder}</ButtonPlaceholder>
                </WriteReviewStyles>
            </BlurView>
        </View>
    )

}

const WriteReviewStyles = styled.TouchableOpacity`
    width: 100%;
    height: 100%;
    border-radius: 40px;
    align-items: center;
    justify-content: center;
`;

const ButtonPlaceholder = styled.Text`
    font-size: 19px;
    font-weight: bold;
    color: white;
`;