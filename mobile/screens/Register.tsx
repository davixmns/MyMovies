import {MyTextInput} from "../components/MyTextInput";
import {useState} from "react";
import {MyButton} from "../components/MyButton";
import {useUserContext} from "../contexts/UserContext";
import {verifyRegisterForm} from "../utils/utils";
import {Alert, TouchableOpacity} from "react-native";
import {User} from "../interfaces/interfaces";
import {useNavigation} from "@react-navigation/native";
import styled from "styled-components/native";

export function Register() {
    const navigation = useNavigation()
    const {createUserAccount} = useUserContext()
    const [name, setName] = useState<string>('davi ximenes')
    const [email, setEmail] = useState<string>('daviximenes@unifor.br')
    const [password, setPassword] = useState<string>('asdasdasd')
    const [confirmPassword, setConfirmPassword] = useState<string>('asdasdasd')

    async function handleCreateAccount() {
        const user: User = {
            name: name,
            email: email,
            password: password,
            profile_picture: null
        }
        const validationResponse = verifyRegisterForm(name, email, password, confirmPassword)
        if (validationResponse !== true) {
            Alert.alert("Erro", validationResponse)
            return
        }
        await createUserAccount(user)
    }

    function backToLogin() {
        navigation.goBack()
    }

    return (
        <Container>
            <Title>Sign Up</Title>
            <Content>
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
                    <MyButton onPress={handleCreateAccount}>Sign Up</MyButton>
                </ButtonContainer>
                <TouchableOpacity onPress={backToLogin}>
                    <CancelRegisterText>Cancel</CancelRegisterText>
                </TouchableOpacity>
            </Content>
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
    padding-bottom: 140px;
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
    gap: 20px;
`

const CancelRegisterText = styled.Text`
    font-size: 18px;
    color: #000;
    font-weight: bold;
    margin-top: 20px;
`


