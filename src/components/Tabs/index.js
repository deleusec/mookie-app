import React, {useEffect, useState} from "react";
import {Button, FlatList, Pressable, StyleSheet, Text, TouchableHighlight, View} from "react-native";

export default function Tabs({buttons, onSelectSwitch}) {
    const [toggle, setToggle] = useState(0)



    return (
        <View style={styles.container}>
            {buttons.map((e, key) => {
                return (
                    <Pressable key={key} style={toggle === key ? styles.button.active : styles.button}
                               onPress={() => {
                                   setToggle(key);
                                   onSelectSwitch(key)
                               }}>

                        <Text style={toggle === key ? styles.button.textActive : styles.button.text}>{e}</Text>
                    </Pressable>
                );
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '90%',
        flexDirection: 'row',
        padding: 6,
        backgroundColor: 'rgba(78, 115, 61, 0.15);',
        borderRadius: 60,

    },
    button: {
        flex: 1,
        paddingBottom: 7,
        paddingTop: 8,
        paddingHorizontal: 32,

        active: {
            flex: 1,
            paddingBottom: 7,
            paddingTop: 8,
            paddingHorizontal: 32,
            backgroundColor: '#4E733D',
            borderRadius: 60
        },

        text: {
            textAlign: 'center',
            color: '#4E733D',
            fontFamily:"Poppins-Medium",
            textAlignVertical:"center"
        },

        textActive: {
            textAlign: 'center',
            color: 'white',
            fontFamily:"Poppins-Medium",
            textAlignVertical:"center"
        }
    }
})
