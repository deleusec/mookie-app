import React, {useEffect, useState} from "react";
import {Image, Pressable, Touchable} from "react-native";

export default function Item({image, onPress}) {
    return(
        <Pressable
        onPress={onPress}>
            <Image source={{uri:image}} style={{width:150, height:150, marginRight:10, borderRadius:5, borderColor: '#D99E32', borderWidth: 2}}/>
        </Pressable>
    )
}
