import {MyTextInput} from "../components/MyTextInput";
import {useEffect, useState} from "react";
import {MyButton} from "../components/MyButton";
import {useUserContext} from "../contexts/UserContext";
import {verifyRegisterForm} from "../utils/utils";
import {Keyboard, KeyboardAvoidingView, Platform, TouchableOpacity, TouchableWithoutFeedback} from "react-native";
import {User} from "../interfaces/interfaces";
import {useNavigation} from "@react-navigation/native";
import styled from "styled-components/native";
import {RotativeIcon} from "../components/RotativeIcon";


export function Register() {
    const navigation = useNavigation()
    const {createUserAccount} = useUserContext()
    const [name, setName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [confirmPassword, setConfirmPassword] = useState<string>('')
    const [buttonDisabled, setButtonDisabled] = useState<boolean>(true)
    const [iconRotating, setIconRotating] = useState<boolean>(false)

    useEffect(() => {
        const validationResponse = verifyRegisterForm(name, email, password, confirmPassword)
        if (validationResponse !== true) {
            setButtonDisabled(true)
        } else {
            setButtonDisabled(false)
        }
    }, [name, email, password, confirmPassword])

    async function handleCreateAccount() {
        setIconRotating(true)
        await new Promise(resolve => setTimeout(resolve, 2000))
        const user: User = {
            name: name,
            email: email,
            password: password,
            profile_picture: null
        }
        await createUserAccount(user)
        setIconRotating(false)
    }

    return (
        <Container>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <Content>
                        <RotativeIcon iconRotating={iconRotating}/>
                        <Title>Sign Up</Title>
                        <FormContainer>
                            <MyTextInput
                                placeholder={'name'}
                                text={name}
                                setText={setName}
                                iconName={'user'}
                            />
                            <MyTextInput
                                placeholder={'email'}
                                text={email}
                                setText={setEmail}
                                keyboardType={'email-address'}
                                autoCapitalize={'none'}
                                iconName={'envelope'}
                            />
                            <MyTextInput
                                placeholder={'password'}
                                text={password}
                                setText={setPassword}
                                secureTextEntry={true}
                                iconName={'lock'}
                            />
                            <MyTextInput
                                placeholder={'confirm password'}
                                text={confirmPassword}
                                setText={setConfirmPassword}
                                secureTextEntry={true}
                                iconName={'lock'}
                            />
                        </FormContainer>
                        <ButtonContainer>
                            <MyButton onPress={handleCreateAccount} title={'Create Account'} disabled={buttonDisabled}/>
                        </ButtonContainer>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={{paddingBottom: 25}}>
                            <CancelRegisterText>Cancel</CancelRegisterText>
                        </TouchableOpacity>
                    </Content>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
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
  padding-bottom: 50px;
`

const Container = styled.View`
  flex: 1;
  background-color: #fafafa;
  align-items: center;
  justify-content: center;
`

const Content = styled.View`
  width: 85%;
  align-items: center;
`

const FormContainer = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
  gap: 20px;
`

const CancelRegisterText = styled.Text`
  font-size: 18px;
  color: #000;
  font-weight: bold;
  margin-top: 20px;
`