import React, {useEffect, useState} from "react";
import {FlatList, Image, Text, TouchableOpacity, View} from "react-native";
import GLOBAL from '../../variables/global'
import colors from '../../variables/colors'
import {useIsFocused} from "@react-navigation/native";

export default function SearchResultScreen({ route, navigation}) {
    return (
        <View style={{flex:1,backgroundColor:colors.cream}}>
            <Text style={{fontSize:22, paddingTop:30, paddingBottom: 15, fontFamily:"Poppins-Medium", color:colors.maroon, paddingHorizontal:15}}>Votre Recherche :</Text>

            <FlatList contentContainerStyle={{paddingHorizontal:10}} keyExtractor={item => item.id} numColumns={2} data={route.params} renderItem={({item})=> {
                return(
                    <TouchableOpacity activeOpacity={0.7} style={{width:"50%" , alignItems:"center", padding: 5}} onPress={() => navigation.navigate('Recipe', item.id)}>
                        <Image source={{uri: GLOBAL.API_URL +"" +item.attributes.images.data[0].attributes.url}} style={{ width:"100%", aspectRatio: 5/6,borderWidth:2,borderColor:colors.yellow, borderRadius: 5}}/>
                        <Text style={{
                            width:"100%",
                            color: '#440203',
                            fontFamily: "Poppins-Light",
                            fontSize: 14}}>{item.attributes.title}</Text>
                    </TouchableOpacity>
                )
            }}/>
        </View>
    )
}
