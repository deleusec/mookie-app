import React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";

import RecipeScreen from "../../screens/Recipe";
import DiscoveryPassScreen from "../../screens/DiscoveryPass";

const Stack = createNativeStackNavigator();

export default function DiscoveryNavigation() {

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}>
            <Stack.Screen name="Discovery" component={DiscoveryPassScreen} />
            <Stack.Screen name="Recipe" component={RecipeScreen} />
        </Stack.Navigator>
    )
}
