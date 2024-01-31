import {NavigationContainer} from "@react-navigation/native";
import {AuthProvider} from "./contexts/AuthContext";
import {UserProvider} from "./contexts/UserContext";
import {StatusBar} from "react-native";
import {AuthStack} from "./routes/AuthStack";
import {MovieProvider} from "./contexts/MovieContext";

export default function App() {
    return (
        <NavigationContainer>
            <AuthProvider>
                <UserProvider>
                    <MovieProvider>
                        <StatusBar backgroundColor={'#000000'} barStyle={'dark-content'} translucent={false}/>
                        <AuthStack/>
                    </MovieProvider>
                </UserProvider>
            </AuthProvider>
        </NavigationContainer>
    )
}
