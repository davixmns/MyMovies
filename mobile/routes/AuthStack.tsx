import {CardStyleInterpolators, createStackNavigator} from "@react-navigation/stack";
import {useAuthContext} from "../contexts/AuthContext";
import {BottomBar} from "./BottomBar";
import {Login} from "../screens/Login";
import {Register} from "../screens/Register";
import {MovieDetails} from "../screens/MovieDetails";
import {SplashScreen} from "../screens/SplashScreen";
import {MoviesByGenre} from "../screens/MoviesByGenre";
import {TopRatedMovies} from "../screens/TopRatedMovies";
import {EditProfile} from "../screens/EditProfile";

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

                    <Stack.Screen
                        name={'TopRatedMovies'}
                        component={TopRatedMovies}
                        options={{
                            headerShown: false,
                            cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS
                        }}
                    />

                    <Stack.Screen
                        name={'EditProfile'}
                        component={EditProfile}
                        options={{
                            headerShown: false,
                            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
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
