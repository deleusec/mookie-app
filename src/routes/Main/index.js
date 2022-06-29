import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import SettingsScreen from "../../screens/Settings";
import RecipesNavigation from "../Recipes";
import {Image, Text} from "react-native";
import FavoritesNavigation from "../Favorites";
import DiscoveryPassScreen from "../../screens/DiscoveryPass";
import DiscoveryNavigation from "../DiscoveryPass";

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
                            case 'HomeNav':
                                icon = require("../../../assets/images/home.png");
                                break;
                            case 'DiscoveryNav':
                                icon = require("../../../assets/images/crown.png");
                                break;
                            case 'FavoritesNav':
                                icon = require("../../../assets/images/heart.png");
                                break;
                            case 'SettingsNav':
                                icon = require("../../../assets/images/settings.png");
                                break;
                        }
                        return <Image source={icon} style={{width:20 , height:20, resizeMode:"contain"}}/>
                    })
            })}>
                <Tab.Screen name="HomeNav" component={RecipesNavigation} />
                <Tab.Screen name="DiscoveryNav" component={DiscoveryNavigation} />
                <Tab.Screen name="FavoritesNav" component={FavoritesNavigation} />
                <Tab.Screen name="SettingsNav" component={SettingsScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    )
}
