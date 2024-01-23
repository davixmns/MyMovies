import {useContext, createContext, useState, useEffect, ReactNode} from "react";
import {useNavigation} from "@react-navigation/native"
import AsyncStorage from "@react-native-async-storage/async-storage";
import {AuthContextType, AuthProviderProps, User} from "../interfaces/interfaces";
import {jwt_key, signJWT, verifyIfUserIsFormatted} from "../utils/utils";
import {Alert} from "react-native";
import * as jose from 'jose'

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuthContext = () => {
    return useContext(AuthContext);
};

export function AuthProvider({children}: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null)
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)

    useEffect(() => {
        verifyIfUserIsAuthenticated()
    }, [])

    // Verifica se o usuário está autenticado
    async function verifyIfUserIsAuthenticated() {
        try {
            const userJwt = await AsyncStorage.getItem('@user-jwt');
            if (userJwt) {
                const decoded = await jose.jwtVerify(userJwt, new TextEncoder().encode(jwt_key))
                const userEmail = decoded.payload.email
                if (userEmail) {
                    const user = await AsyncStorage.getItem('@user-' + userEmail);
                    setUser(JSON.parse(user as string));
                    setIsAuthenticated(true);
                }
            }
        } catch (e) {
            console.error('Erro ao verificar a jwt do usuário:', e);
        }
    }

    async function login(email: string, password: string) {
        try {
            const user = await AsyncStorage.getItem('@user-' + email);
            console.log("USER -> ", user)
            if (!user) {
                Alert.alert("Erro", "Usuário não encontrado")
                return
            }
            // if (user?. === password) {
            //     const jwt = await signJWT(email)
            //     await AsyncStorage.setItem('@user-jwt', jwt)
            //     setIsAuthenticated(true)
            //     setUser(user)
            // }
        } catch (e) {
            console.log(e)
        }
    }

    async function logout() {
        try {
            await AsyncStorage.removeItem('@user-jwt')
            setIsAuthenticated(false)
            setUser(null)
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <AuthContext.Provider value={{
            isAuthenticated,
            setIsAuthenticated,
            user,
            setUser,
            login,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    )

}
