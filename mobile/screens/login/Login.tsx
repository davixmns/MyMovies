import {Alert, Keyboard, TouchableOpacity, TouchableWithoutFeedback} from "react-native";
import {useState} from "react";
import {useAuthContext} from "../../contexts/AuthContext";
import {verifyLoginForm} from "../../utils/utils";
import {ButtonContainer, TextRegisterBlack, TextRegisterBlue} from "./styles";
import {MyTextInput} from "../../components/MyTextInput";
import {MyButton} from "../../components/MyButton";
import {useNavigation} from "@react-navigation/native";
import {ContainerLogin, ContentLogin, LoginFormContainer, TitleLogin} from "./styles";

export function Login() {
    const navigation = useNavigation()
    const {login} = useAuthContext()
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

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
        <ContainerLogin>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

                <ContentLogin>
                    <TitleLogin>My Movies</TitleLogin>
                    <LoginFormContainer>
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
                    </LoginFormContainer>
                    <ButtonContainer>
                        <MyButton onPress={handleLogin}>Log in</MyButton>
                    </ButtonContainer>
                    <ButtonContainer>
                        <TextRegisterBlack>Don't have an account?</TextRegisterBlack>
                        <TouchableOpacity onPress={handleGoToSignUp}>
                            <TextRegisterBlue> Sign up.</TextRegisterBlue>
                        </TouchableOpacity>
                    </ButtonContainer>

                </ContentLogin>
            </TouchableWithoutFeedback>
        </ContainerLogin>
    )
}
