import React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";

import RecipesScreen from "../../screens/Recipes";
import RecipeScreen from "../../screens/Recipe";

const Stack = createNativeStackNavigator();

export default function RecipesNavigation() {

    return (
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}>
                <Stack.Screen name="Recipes" component={RecipesScreen} />
                <Stack.Screen name="Recipe" component={RecipeScreen} />
            </Stack.Navigator>
    )
}
