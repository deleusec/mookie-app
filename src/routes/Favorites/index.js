import React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";

import FavoritesScreen from "../../screens/Favorites";
import RecipeScreen from "../../screens/Recipe";

const Stack = createNativeStackNavigator();

export default function FavoritesNavigation() {

    return (
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}>
                <Stack.Screen name="Favorites" component={FavoritesScreen} />
                <Stack.Screen name="Recipe" component={RecipeScreen} />
            </Stack.Navigator>
    )
}
