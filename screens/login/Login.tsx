import {Alert, Text, TextInput} from "react-native";
import {useState} from "react";
import {useAuthContext} from "../../contexts/AuthContext";
import {verifyLoginForm} from "../../utils/utils";
import "./styles";
import {AppTitle, ButtonContainer, Container, Content, LoginForm} from "./styles";
import {MyTextInput} from "../../components/MyTextInput";
import {MyButton} from "../../components/MyButton";

export function Login() {
    const {login} = useAuthContext()
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    async function handleLogin() {
        if (login) {
            const validationResponse = verifyLoginForm(email, password)
            if (validationResponse !== true) {
                Alert.alert("Erro", validationResponse)
                return
            }
            await login(email, password)
        }
    }

    return (
        <Container>
            <Content>
                <AppTitle>My Movies</AppTitle>
                <LoginForm>
                    <MyTextInput
                        text={email}
                        setText={setEmail}
                        placeholder={'email'}
                        keyboardType={'email-address'}
                        autoCapitalize={'none'}
                    />
                    <MyTextInput
                        text={password}
                        setText={setPassword}
                        placeholder={'password'}
                        keyboardType={'default'}
                        secureTextEntry={true}
                    />
                </LoginForm>
                <ButtonContainer>
                    <MyButton onPress={handleLogin}>Log in</MyButton>
                </ButtonContainer>
            </Content>
        </Container>
    )
}