import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {Feather} from "@expo/vector-icons";
import styled from "styled-components/native";
import {Home} from "../screens/Home";
import {Favorites} from "../screens/Favorites";
import {Reviews} from "../screens/Reviews";
import {Profile} from "../screens/Profile";

const Tab = createBottomTabNavigator();

export function BottomBar() {
    return(
        <NavigatorContainer>
            <Tab.Navigator
                screenOptions={{
                    tabBarStyle: {
                        backgroundColor: '#000000',
                        height: 70,
                    },
                    tabBarActiveTintColor: '#ffffff',
                }}>

                <Tab.Screen
                    name={'Home'}
                    component={Home}
                    options={{
                        tabBarHideOnKeyboard: true,
                        tabBarShowLabel: false,
                        headerShown: false,
                        tabBarIcon: ({focused}) => (
                            <Feather
                                name="list"
                                size={30}
                                color={focused ? '#e07e38' : '#fff'}
                                style={{width: 30, height: 30}}
                            />
                        )
                    }}
                />

                <Tab.Screen
                    name={'Favorites'}
                    component={Favorites}
                    options={{
                        tabBarHideOnKeyboard: true,
                        tabBarShowLabel: false,
                        headerShown: false,
                        tabBarIcon: ({focused}) => (
                            <Feather
                                name={'star'}
                                size={30}
                                color={focused ? '#e07e38' : '#fff'}
                                style={{width: 30, height: 30}}
                            />
                        )
                    }}
                />

                <Tab.Screen
                    name={'Reviews'}
                    component={Reviews}
                    options={{
                        tabBarHideOnKeyboard: true,
                        tabBarShowLabel: false,
                        headerShown: false,
                        tabBarIcon: ({focused}) => (
                            <Feather
                                name={'cloud'}
                                size={30}
                                color={focused ? '#e07e38' : '#fff'}
                                style={{width: 30, height: 30}}
                            />
                        )
                    }}
                />

                <Tab.Screen
                    name={'Profile'}
                    component={Profile}
                    options={{
                        tabBarHideOnKeyboard: true,
                        tabBarShowLabel: false,
                        headerShown: false,
                        tabBarIcon: ({focused}) => (
                            <Feather
                                name={'user'}
                                size={30}
                                color={focused ? '#e07e38' : '#fff'}
                                style={{width: 30, height: 30}}
                            />
                        )
                    }}
                />

            </Tab.Navigator>
        </NavigatorContainer>
    )
}

const NavigatorContainer = styled.View`
  display: flex;
  flex: 1;
`
