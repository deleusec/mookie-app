import React, {useEffect} from "react";
import {StyleSheet, Text, View} from "react-native";
import data from "../../../bdd.json";
import Listing from "../Listing";

export default function Search({data, navigation}) {

    console.log(data)
    return (
        <View style={styles.container}>
            <Listing data={data} navigation={navigation}>Recherche</Listing>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        paddingTop: 115,
        backgroundColor: "#FBF7EF",
        position:"absolute",
        top: 0,
        left: 0,
        right:0,
        bottom:0,
        zIndex:9
    }
})
