import {User, UserContextType, UserProviderProps} from "../interfaces/interfaces";
import {createContext, useContext} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Alert} from "react-native";
import {useAuthContext} from "./AuthContext";
import {createUserAccountService} from "../service/service";

const UserContext = createContext<UserContextType>({} as UserContextType)

export function useUserContext() {
    return useContext(UserContext)
}

export function UserProvider({children}: UserProviderProps) {
    const {setIsAuthenticated, setUser} = useAuthContext()

    async function createUserAccount(newUser: User) {
        await createUserAccountService(newUser)
            .then(async (response) => {
                const data = response.data
                await AsyncStorage.setItem('@user-jwt', data.user_jwt)
                setIsAuthenticated(true)
            })
            .catch((e) => {
                console.log(e)
            })
    }

    async function updateUserInCache(user: User) {
        try {
            const userJson = JSON.stringify(user);
            await AsyncStorage.setItem(`@user-${user.email}`, userJson);
            setUser(user);
        } catch (error) {
            console.error("Erro ao salvar usuário no cache: ", error);
        }
    }

    return (
        <UserContext.Provider value={{
            createUserAccount,
            // @ts-ignore
            updateUserInCache
        }}>
            {children}
        </UserContext.Provider>
    );
}
