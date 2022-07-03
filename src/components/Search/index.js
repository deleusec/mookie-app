import React, {useEffect} from "react";
import {FlatList, Image, StyleSheet, Text, View} from "react-native";
import Listing from "../Listing";
import GLOBAL from "../../variables/global"
import colors from "../../variables/colors";

export default function Search({data, navigation}) {

    return (
        <View style={styles.container}>
            {data.map((item, index)=>{
                return(
                    <Text style={{ width:"100%", color: '#440203', fontFamily: "Poppins-Light", fontSize: 16}} onPress={()=>navigation.navigate('Recipe', item.id)} key={index}>{item.attributes.title}</Text>
                )
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        paddingTop: 115,
        paddingHorizontal: 50,
        position:"absolute",
        top: 0,
        left: 0,
        right:0,
        bottom:0,
        zIndex:9
    }
})
