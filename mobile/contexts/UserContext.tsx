import {User, UserContextType, UserProviderProps} from "../interfaces/interfaces";
import {createContext, useContext} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useAuthContext} from "./AuthContext";
import {createUserAccountService, saveProfilePictureService, updateUserAccountService} from "../service/service";
import {Alert} from "react-native";
import {MY_IP} from "../config";

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
                Alert.alert('Ops!', e.response.data.message)
                console.log('Error creating user account ->', e)
            })
    }

    async function updateUserAccount(userToUpdate: User, imageFormData: FormData) {
        const user_jwt = await AsyncStorage.getItem('@user-jwt')
        if (!user_jwt) return
        await updateUserAccountService(userToUpdate, user_jwt)
            .then(async (response1) => {
                await saveProfilePictureService(imageFormData, user_jwt)
                    .then((response2) => {
                        const imgPath = `http://${MY_IP}/${response2.data.profile_picture}?timestamp=${Date.now()}`
                        // @ts-ignore
                        setUser({...response1.data.user, profile_picture: imgPath})
                    })
                    .catch((error) => {
                        console.log(error)
                        Alert.alert('Error', 'An error occurred while trying to update your profile picture')
                    })
            })
            .catch((e) => {
                Alert.alert('Error', 'An error occurred while trying to update your account')
                console.log('Error updating user account ->', e)
            })

    }

    return (
        <UserContext.Provider value={{
            createUserAccount,
            updateUserAccount,
        }}>
            {children}
        </UserContext.Provider>
    );
}
