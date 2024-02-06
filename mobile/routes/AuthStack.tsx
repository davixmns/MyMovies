import {CardStyleInterpolators, createStackNavigator} from "@react-navigation/stack";
import {useAuthContext} from "../contexts/AuthContext";
import {BottomBar} from "./BottomBar";
import {Login} from "../screens/login/Login";
import {Register} from "../screens/register/Register";
import {MovieDetails} from "../screens/movie_details/MovieDetails";
import {SplashScreen} from "../screens/SplashScreen";
import {MoviesByGenre} from "../screens/movies_by_genre/MoviesByGenre";

const Stack = createStackNavigator();

export function AuthStack() {
    const {isAuthenticated, isLoading} = useAuthContext()

    if (isLoading) {
        return <SplashScreen/>
    }

    return (
        <Stack.Navigator screenOptions={{
            headerShown: false,
            gestureEnabled: true,
        }}>
            {isAuthenticated ? (
                <>
                    <Stack.Screen
                        name={'BottomBar'}
                        component={BottomBar}
                        options={{
                            headerShown: false,
                            cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS
                        }}
                    />

                    <Stack.Screen
                        name={'MovieDetails'}
                        component={MovieDetails}
                        options={{
                            headerShown: false,
                            cardStyleInterpolator: CardStyleInterpolators.forScaleFromCenterAndroid,
                        }}
                    />

                    <Stack.Screen
                        name={'MoviesByGenre'}
                        component={MoviesByGenre}
                        options={{
                            headerShown: false,
                            cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS
                        }}
                    />

                </>
            ) : (
                <>
                    <Stack.Screen
                        name={'Login'}
                        component={Login}
                        options={{
                            headerShown: false,
                            cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter
                        }}
                    />
                    <Stack.Screen
                        name={'Register'}
                        component={Register}
                        options={{
                            headerShown: false,
                            cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter
                        }}
                    />
                </>
            )}
        </Stack.Navigator>
    )
}
