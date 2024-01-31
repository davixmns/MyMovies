import {useContext, createContext, useState, useEffect} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {AuthContextType, AuthProviderProps, User} from "../interfaces/interfaces";
import {Alert} from "react-native";
import {loginService, verifyUserJwtService} from "../service/service";

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuthContext = () => {
    return useContext(AuthContext);
};

export function AuthProvider({children}: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null)
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    useEffect(() => {
        verifyIfUserIsAuthenticated()
    }, [])

    // Verifica se o usuário está autenticado
    async function verifyIfUserIsAuthenticated() {
        const user_jwt = await AsyncStorage.getItem('@user-jwt')
        //@ts-ignore
        await verifyUserJwtService(user_jwt)
            .then((response) => {
                const data = response.data
                const user: User = {
                    name: data.user.name,
                    email: data.user.email,
                }
                setUser(user)
                setIsAuthenticated(true)
            })
            .catch((e) => {
                console.log(e)
            })
            .finally(() => setIsLoading(false))
    }

    async function login(email: string, password: string) {
        await loginService(email, password)
            .then((response) => {
                console.log(response)
            })
            .catch((e) => {
                console.log(e)
            })
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
            isLoading,
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
