import {User, UserContextType, UserProviderProps} from "../interfaces/interfaces";
import {createContext, useContext} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useAuthContext} from "./AuthContext";
import {createUserAccountService, updateUserAccountService} from "../service/service";
import {Alert} from "react-native";

const UserContext = createContext<UserContextType>({} as UserContextType)

export function useUserContext() {
    return useContext(UserContext)
}

export function UserProvider({children}: UserProviderProps) {
    const {setIsAuthenticated} = useAuthContext()
    const {setUser} = useAuthContext()

    async function createUserAccount(newUser: User) {
        await createUserAccountService(newUser)
            .then(async (response) => {
                const data = response.data
                setUser(data.user)
                await AsyncStorage.setItem('@user-jwt', data.user_jwt)
                setIsAuthenticated(true)
            })
            .catch((e) => {
                console.log(e)
            })
    }

    async function updateUserAccount(user: User) {
        const user_jwt = await AsyncStorage.getItem('@user-jwt')
        if (!user_jwt) return
        await updateUserAccountService(user, user_jwt)
            .then(() => {
                setUser(user)
                console.log('User updated')
            })
            .catch((e) => {
                Alert.alert('Erro', e.response.data.message)
                console.log(e)
            })
    }

    return (
        <UserContext.Provider value={{
            createUserAccount,
            updateUserAccount
        }}>
            {children}
        </UserContext.Provider>
    );
}
