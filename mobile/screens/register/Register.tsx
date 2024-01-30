import {MyTextInput} from "../../components/MyTextInput";
import {useState} from "react";
import {ButtonContainer} from "../login/styles";
import {MyButton} from "../../components/MyButton";
import {useUserContext} from "../../contexts/UserContext";
import {verifyRegisterForm} from "../../utils/utils";
import {Alert, TouchableOpacity} from "react-native";
import {User} from "../../interfaces/interfaces";
import {CancelRegisterText, ContainerRegister, ContentRegister, RegisterFormContainer, TitleRegister} from "./styles";
import {useNavigation} from "@react-navigation/native";

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
            password: password
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
        <ContainerRegister>
                <TitleRegister>Sign Up</TitleRegister>
            <ContentRegister>
                <RegisterFormContainer>
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
                </RegisterFormContainer>
                <ButtonContainer>
                    <MyButton onPress={handleCreateAccount}>Sign Up</MyButton>
                </ButtonContainer>
                    <TouchableOpacity onPress={backToLogin}>
                        <CancelRegisterText>Cancel</CancelRegisterText>
                    </TouchableOpacity>
            </ContentRegister>
        </ContainerRegister>
    )
}
