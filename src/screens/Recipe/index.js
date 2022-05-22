import React from "react";
import {Button, Text, View} from "react-native";

export default function RecipeScreen({route, navigation}) {

    const id = route.params
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{ color:"#000000" }}>{id}</Text>
            <Button title="Go back" onPress={() => navigation.goBack()} />
        </View>
    )
}
