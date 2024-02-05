import styled from "styled-components/native";
import {FontAwesome6} from "@expo/vector-icons";

export function TextButton(
    {onPress, placeholder, iconName}
        : { onPress: () => void, placeholder: string, iconName: string }) {
    return (
        <Container onPress={onPress}>
            <FontAwesome6 name={iconName} size={30} color="black"/>
            <ButtonText>{placeholder}</ButtonText>
        </Container>
    );
}

const Container = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 20px;
  width: 100%
`

const ButtonText = styled.Text`
  font-size: 25px;
  color: #000;
  font-weight: bold;
`

