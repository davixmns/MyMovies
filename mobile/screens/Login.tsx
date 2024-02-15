import {Alert, Keyboard, TouchableOpacity, TouchableWithoutFeedback} from "react-native";
import {useState} from "react";
import {useAuthContext} from "../contexts/AuthContext";
import {verifyLoginForm} from "../utils/utils";
import {MyTextInput} from "../components/MyTextInput";
import {MyButton} from "../components/MyButton";
import {useNavigation} from "@react-navigation/native";
import styled from "styled-components/native";

export function Login() {
    const navigation = useNavigation()
    const {login} = useAuthContext()
    const [email, setEmail] = useState<string>('daviximenes@unifor.br')
    const [password, setPassword] = useState<string>('asdasdasd')

    async function handleLogin() {
        if (!login) return
        const validationResponse = verifyLoginForm(email, password)
        if (validationResponse !== true) {
            Alert.alert("Erro", validationResponse)
            return
        }
        await login(email, password)
    }

    async function handleGoToSignUp() {
        // @ts-ignore
        navigation.navigate('Register')
    }

    return (
        <Container>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Content>
                    <Title>My Movies</Title>
                    <FormContainer>
                        <MyTextInput
                            text={email}
                            setText={setEmail}
                            placeholder={'email'}
                            keyboardType={'email-address'}
                            autoCapitalize={'none'}
                            iconName={'envelope'}
                        />
                        <MyTextInput
                            text={password}
                            setText={setPassword}
                            placeholder={'password'}
                            keyboardType={'default'}
                            secureTextEntry={true}
                            autoCapitalize={'none'}
                            iconName={'lock'}
                        />
                    </FormContainer>
                    <ButtonContainer>
                        <MyButton onPress={handleLogin}>Log in</MyButton>
                    </ButtonContainer>
                    <ButtonContainer>
                        <TextRegisterBlack>Don't have an account?</TextRegisterBlack>
                        <TouchableOpacity onPress={handleGoToSignUp}>
                            <TextRegisterBlue> Sign up.</TextRegisterBlue>
                        </TouchableOpacity>
                    </ButtonContainer>
                </Content>
            </TouchableWithoutFeedback>
        </Container>
    )
}

const ButtonContainer = styled.View`
    width: 100%;
    align-items: center;
    justify-content: center;
    margin-top: 70px;
    flex-direction: row;
`

const Title = styled.Text`
  font-size: 36px;
  color: black;
  font-weight: 500;
`

const Container = styled.View`
  flex: 1;
  background-color: #fafafa;
  align-items: center;
  justify-content: center;
`

const Content = styled.View`
  width: 85%;
  height: 40%;
  align-items: center;
`

const FormContainer = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
  margin-top: 70px;
  gap: 20px;
`

const TextRegisterBlack = styled.Text`
    font-size: 18px;
    color: #000;
`

const TextRegisterBlue = styled.Text`
    font-size: 18px;
    color: #3797EF;
`
