import styled from "styled-components/native";
import {Alert, Text, TextInput} from "react-native";
import {useState} from "react";
import {useAuthContext} from "../contexts/AuthContext";
import {verifyLoginForm} from "../utils/utils";

export function Login() {
    const {login} = useAuthContext()
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    async function handleLogin() {
        if (login) {
            const validationResponse = verifyLoginForm(email, password)
            if(validationResponse !== true){
                Alert.alert("Erro", validationResponse)
                return
            }
            await login(email, password)
        }
    }

    return (
        <Container>
            <Text>Login</Text>
        </Container>
    )
}

const Container = styled.View`
  flex: 1;
  background-color: #fff;
  align-items: center;
  justify-content: center;
`