import React, {useState} from "react";
import {Button, FlatList, Pressable, StyleSheet, Text, TouchableHighlight, View} from "react-native";
import AuthScreen from "../../screens/Authentication";

export default function Tabs({buttons, onSelectSwitch}) {
    const [getSwitch, setSwitch] = useState(0)

    const updateSelectSwitch=(val)=> {
        onSelectSwitch(val)
        setSwitch(val)
    }

    return (
        <View style={styles.container}>
            {buttons.map((e, key) => {
                return (
                    <Pressable style={getSwitch === key?styles.button.active:styles.button} onPress={() => updateSelectSwitch(key)}>
                        <Text style={getSwitch === key?styles.button.text.active:styles.button.text}>{e}</Text>
                    </Pressable>
                );
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        width: '90%',
        flexDirection: 'row',
        padding: 6,
        backgroundColor:'rgba(78, 115, 61, 0.15);',
        borderRadius: 60,

    },
    button : {
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

        text : {
            textAlign: 'center',
            color : '#4E733D',
            active: {
                textAlign: 'center',
                color : 'white',
            }
        }
    }
})
