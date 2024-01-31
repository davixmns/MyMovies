import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import styled from "styled-components/native";
import {Home} from "../screens/home/Home";
import {Favorites} from "../screens/favorites/Favorites";
import {Reviews} from "../screens/reviews/Reviews";
import {Profile} from "../screens/profile/Profile";
import {FontAwesome6} from '@expo/vector-icons';
import {MaterialIcons} from '@expo/vector-icons';
import { BlurView } from "expo-blur";

const Tab = createBottomTabNavigator();

export function BottomBar() {
    return (
        <NavigatorContainer>
                <Tab.Navigator
                    screenOptions={{
                        tabBarStyle: {
                            backgroundColor: 'rgba(10, 10, 10, 0.3)', // Fundo translúcido
                            position: 'absolute',

                            height: 90,
                            // Outras customizações necessárias...
                        },
                        tabBarActiveTintColor: 'blue', // Cor quando um item está ativo
                        tabBarInactiveTintColor: '#000', // Cor quando um item está inativo
                        tabBarBackground: () => (
                            <BlurView intensity={60} style={{flex: 1}}/>
                        ),
                    }}>

                    <Tab.Screen
                        name={'Home'}
                        component={Home}
                        options={{
                            tabBarHideOnKeyboard: true,
                            tabBarShowLabel: false,
                            headerShown: false,
                            tabBarIcon: ({focused}) => (
                                <FontAwesome6
                                    name="house-chimney"
                                    size={28}
                                    color={focused ? '#3797EF' : '#fafafa'}
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
                                <MaterialIcons
                                    name={'favorite'}
                                    size={32}
                                    color={focused ? '#3797EF' : '#fafafa'}
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
                                <MaterialIcons
                                    name={'reviews'}
                                    size={30}
                                    color={focused ? '#3797EF' : '#fafafa'}
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
                                <FontAwesome6
                                    name={'user'}
                                    size={26}
                                    color={focused ? '#3797EF' : '#fafafa'}
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