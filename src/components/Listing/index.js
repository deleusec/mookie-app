import React, {useEffect, useState} from "react";
import {FlatList, Image, Pressable, ScrollView, StyleSheet, Text, View} from "react-native";
import Item from "../Item";

export default function Listing({children, data, navigation}) {
    const[list, setList] = useState()

    return(
        <View style={{paddingTop:25}}>
            <Text style={{color:'#440203' , fontSize:18}}>{children}</Text>
            <FlatList
                style={{}}
                horizontal={true}
                data={data}
                keyExtractor={item => item.id}
                renderItem={({item}) => {
                    return (
                        <Item
                        image={item.image}
                        onPress={() => navigation.navigate('Recipe', item.id)}
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
