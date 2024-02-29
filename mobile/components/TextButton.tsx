import styled from "styled-components/native";
import {FontAwesome6} from "@expo/vector-icons";

export function TextButton(
    {onPress, placeholder, iconName, iconColor, arrowIcon}
        : { onPress: () => void, placeholder: string, iconName: string, iconColor: string, arrowIcon?: boolean }) {
    return (
        <Container onPress={onPress}>
            <Content>
                <IconContainer>
                    <FontAwesome6 name={iconName} size={22} color={iconColor}/>
                </IconContainer>
                <ButtonText>{placeholder}</ButtonText>
            </Content>
            {arrowIcon && (
                <FontAwesome6 name={'chevron-right'} size={20} color="black"/>
            )}
        </Container>
    );
}

const Container = styled.TouchableOpacity`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    width: 100%;
`

const Content = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 20px;
`

const IconContainer = styled.View`
    background-color: #f3f2f5;
    border-radius: 10px;
    padding: 15px;
`

const ButtonText = styled.Text`
    font-size: 20px;
    color: #000;
`

