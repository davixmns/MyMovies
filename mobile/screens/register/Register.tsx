import {MyTextInput} from "../../components/MyTextInput";
import {useState} from "react";
import {ButtonContainer} from "../login/styles";
import {MyButton} from "../../components/MyButton";
import {useUserContext} from "../../contexts/UserContext";
import {verifyRegisterForm} from "../../utils/utils";
import {Alert, Text, TouchableOpacity} from "react-native";
import {User} from "../../interfaces/interfaces";
import {CancelRegisterText, ContainerRegister, ContentRegister, RegisterFormContainer, TitleRegister} from "./styles";
import {useNavigation} from "@react-navigation/native";

export function Register() {
    const navigation = useNavigation()
    const {saveUserInCache} = useUserContext()
    const [name, setName] = useState<string>('Davi Ximenes')
    const [email, setEmail] = useState<string>('daviximenes@unifor.br')
    const [password, setPassword] = useState<string>('asdasdasd')
    const [confirmPassword, setConfirmPassword] = useState<string>('asdasdasd')

    async function handleCreateAccount() {
        if(!saveUserInCache) return;
        //validando os campos de registro
        const validationResponse = verifyRegisterForm(name, email, password, confirmPassword);
        if(validationResponse !== true) {
            Alert.alert("Erro", validationResponse);
            return;
        }
        const newUser: User = {
            name: name,
            email: email,
            password: password,
            favorite_movies: []
        };
        saveUserInCache(newUser);
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
                    />
                    <MyTextInput
                        placeholder={'email'}
                        text={email}
                        setText={setEmail}
                        keyboardType={'email-address'}
                        autoCapitalize={'none'}
                    />
                    <MyTextInput
                        placeholder={'password'}
                        text={password}
                        setText={setPassword}
                        secureTextEntry={true}
                    />
                    <MyTextInput
                        placeholder={'confirm password'}
                        text={confirmPassword}
                        setText={setConfirmPassword}
                        secureTextEntry={true}
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
