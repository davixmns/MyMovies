import {useContext, createContext, useState, useEffect} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {AuthContextType, AuthProviderProps, User} from "../interfaces/interfaces";
import {Alert} from "react-native";
import {deleteMyAccountService, loginService, verifyUserJwtService} from "../service/service";
import {MY_IP} from "../config";

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuthContext = () => {
    return useContext(AuthContext);
};

export function AuthProvider({children}: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null)
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(true)

    useEffect(() => {
        verifyIfUserIsAuthenticated()
    }, [])

    // Verifica se o usuário está autenticado
    async function verifyIfUserIsAuthenticated() {
        const user_jwt = await AsyncStorage.getItem('@user-jwt')
        //@ts-ignore
        await verifyUserJwtService(user_jwt)
            .then(async (response) => {
                const data = response.data
                const user: User = {
                    name: data.user.name,
                    email: data.user.email,
                    profile_picture: data.user.profile_picture,
                    user_id: data.user.user_id
                }
                setIsAuthenticated(true)
                setUser(user)
            })
            .catch(() => {
            })
            .finally(async () => {
                await new Promise(resolve => setTimeout(resolve, 1500))
                setIsLoading(false)
            })
    }

    async function login(email: string, password: string) {
        await loginService(email, password)
            .then(async (response) => {
                const data = response.data
                const user: User = {
                    name: data.user.name,
                    email: data.user.email,
                    profile_picture: data.user.profile_picture,
                    user_id: data.user.user_id
                }
                setUser(user)
                await AsyncStorage.setItem('@user-jwt', data.user_jwt)
                setIsAuthenticated(true)
            }).catch((e) => {
                Alert.alert('Ops!', e.response.data.message)
                console.log('Error logging in ->', e)
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

    async function deleteMyAccount() {
        try {
            const user_jwt = await AsyncStorage.getItem('@user-jwt')
            if (!user_jwt) return
            await deleteMyAccountService(user_jwt)
            setIsAuthenticated(false)
            setUser(null)
            await AsyncStorage.removeItem('@user-jwt')
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
            logout,
            deleteMyAccount
        }}>
            {children}
        </AuthContext.Provider>
    )

}
