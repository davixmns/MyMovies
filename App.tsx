import {NavigationContainer} from "@react-navigation/native";
import {AuthProvider} from "./contexts/AuthContext";
import {UserProvider} from "./contexts/UserContext";
import {StatusBar} from "react-native";
import {AuthStack} from "./routes/AuthStack";

export default function App() {
  return (
      <NavigationContainer>
        <AuthProvider>
          <UserProvider>
            <StatusBar backgroundColor={'#000000'} barStyle={'light-content'} translucent={false}/>
            <AuthStack/>
          </UserProvider>
        </AuthProvider>
      </NavigationContainer>
  )
}
