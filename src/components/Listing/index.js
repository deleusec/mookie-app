import React, {useEffect, useState} from "react";
import {FlatList, Image, Pressable, ScrollView, StyleSheet, Text, View} from "react-native";
import Item from "../Item";

export default function Listing({children, data, navigation, width=220, height=200, noBorder=false}) {
    const GLOBAL = require('./../../variables/global')

    return(
        <View style={{paddingTop:25, paddingHorizontal:15}}>
            <Text style={{color:'#440203' , fontSize:22, paddingVertical: 5, fontFamily: "Poppins-Medium"}}>{children}</Text>
            <FlatList
                style={{  flex: 1, marginHorizontal: -15}}
                contentContainerStyle={{paddingHorizontal: 15}}
                horizontal={true}
                data={data}
                keyExtractor={({ id }, index) => id}
                renderItem={({item}) => {
                    return (
                        <Item
                        noBorder={noBorder}
                        width={height} height={width}
                        image={GLOBAL.API_URL+item.attributes.images.data[0].attributes.url}
                        onPress={() => navigation.navigate('Recipe', item.id)}
                        title={item.attributes.title}
                        />
                    )
                }
                }
            />


        </View>
    )
}


const styles = StyleSheet.create({
    scrollView : {
        flexDirection: "row",
    }
})
