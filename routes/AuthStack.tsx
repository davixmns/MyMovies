import {CardStyleInterpolators, createStackNavigator} from "@react-navigation/stack";
import {useAuthContext} from "../contexts/AuthContext";
import {BottomBar} from "./BottomBar";
import {Login} from "../screens/login/Login";
import {Register} from "../screens/Register";

const Stack = createStackNavigator();

export function AuthStack() {
    const {isAuthenticated} = useAuthContext()

    return (
        <Stack.Navigator screenOptions={{
            headerShown: false,
            gestureEnabled: false,
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
        }}>
            {isAuthenticated ? (
                <>
                    <Stack.Screen
                        name={'BottomBar'}
                        component={BottomBar}
                        options={{headerShown: false}}
                    />
                </>
            ) : (
                <>
                    <Stack.Screen
                        name={'Login'}
                        component={Login}
                        options={{headerShown: false}}
                    />
                    <Stack.Screen
                        name={'Register'}
                        component={Register}
                        options={{headerShown: false}}
                    />
                </>
            )}
        </Stack.Navigator>
    )
}
