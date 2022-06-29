import React, {useEffect, useState} from "react";
import {Image, Pressable, Text, Touchable} from "react-native";
const colors = require('./../../variables/colors')

export default function Item({image, onPress, title, width, height, noBorder}) {
    const [border, setBorder] = useState({})

    useEffect(()=>{
        if(noBorder===false){
            setBorder({borderColor: colors.yellow, borderWidth: 2})
        }
    },[])

    return(
        <Pressable
        onPress={onPress}>
            <Image source={{uri:image}} style={{width:width, height:height, marginRight:10, borderRadius:5, ...border }}/>
            <Text style={{fontSize:16, width:200, fontFamily: "Poppins-Light", color:colors.maroon}}>{title}</Text>
        </Pressable>
    )
}
