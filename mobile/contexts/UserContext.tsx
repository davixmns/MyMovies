import {User, UserContextType, UserProviderProps} from "../interfaces/interfaces";
import {createContext, useContext} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useAuthContext} from "./AuthContext";
import {createUserAccountService} from "../service/service";

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

    return (
        <UserContext.Provider value={{
            createUserAccount,
        }}>
            {children}
        </UserContext.Provider>
    );
}
