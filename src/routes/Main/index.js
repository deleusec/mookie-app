import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import SettingsScreen from "../../screens/Settings";
import RecipesNavigation from "../Recipes";
import FavoritesScreen from "../../screens/Favorites";
import {Image, Text} from "react-native";

const Tab = createBottomTabNavigator();

export default function MainNavigation() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({route}) => ({
                    headerShown: false,
                    tabBarActiveTintColor: "#FFF",
                    tabBarActiveBackgroundColor: "#D99E32",
                    tabBarItemStyle: {borderRadius:50, margin: 5},
                    tabBarShowLabel: false,
                    tabBarStyle: {backgroundColor:"#4E733D",marginHorizontal:25, borderRadius:50, position:"absolute",bottom: 15, borderColor:"#4E733D"},
                    tabBarIcon:(()=>{
                        let icon = "";
                        switch (route.name) {
                            case 'Home':
                                icon = require("../../../assets/images/crown.png");
                                break;
                            case 'Favorites':
                                icon = require("../../../assets/images/heart.png");
                                break;
                            case 'Settings':
                                icon = require("../../../assets/images/settings.png");
                                break;
                        }
                        return <Image source={icon} style={{width:20 , height:20, resizeMode:"contain"}}/>
                    })
            })}>
                <Tab.Screen name="Home" component={RecipesNavigation} />
                <Tab.Screen name="Favorites" component={FavoritesScreen} />
                <Tab.Screen name="Settings" component={SettingsScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    )
}
