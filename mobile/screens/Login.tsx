import {Keyboard, TouchableOpacity, TouchableWithoutFeedback, Text} from "react-native";
import {useEffect, useState} from "react";
import {useAuthContext} from "../contexts/AuthContext";
import {verifyLoginForm} from "../utils/utils";
import {MyTextInput} from "../components/MyTextInput";
import {MyButton} from "../components/MyButton";
import {useNavigation} from "@react-navigation/native";
import styled from "styled-components/native";
import {RotativeIcon} from "../components/RotativeIcon";


export function Login() {
    const navigation = useNavigation()
    const {login} = useAuthContext()
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [buttonDisabled, setButtonDisabled] = useState<boolean>(true)
    const [iconRotating, setIconRotating] = useState<boolean>(false)

    useEffect(() => {
        const validationResponse = verifyLoginForm(email, password)
        if (validationResponse !== true) {
            setButtonDisabled(true)
        } else {
            setButtonDisabled(false)
        }
    }, [email, password]);

    async function handleLogin() {
        if (!login) return
        Keyboard.dismiss()
        setIconRotating(true)
        await new Promise(resolve => setTimeout(resolve, 1000))
        await login(email, password)
        setIconRotating(false)
    }

    async function handleGoToSignUp() {
        // @ts-ignore
        navigation.navigate('Register')
    }

    return (
        <Container behavior={'padding'}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Content>
                    <RotativeIcon iconRotating={iconRotating}/>
                    <Title>My Movies</Title>
                    <Text>Developed by github.com/davixmns</Text>
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
                        <MyButton
                            title={'Enter'}
                            onPress={handleLogin}
                            disabled={buttonDisabled}
                        />
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

const Container = styled.KeyboardAvoidingView`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: white;
`

const Content = styled.View`
  width: 85%;
  align-items: center;
  justify-content: center;
`

const ButtonContainer = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
  margin-top: 70px;
  flex-direction: row;
`

const Title = styled.Text`
  font-size: 36px;
  font-weight: 500;
  color: black;
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
  font-weight: bold;
`
