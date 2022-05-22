import * as React from 'react';
import {Button, Text, StyleSheet, View, TouchableHighlight, Image, TextInput} from "react-native";
import Tabs from "../../components/Tabs";
import {useState} from "react";

const email = 'cd.deleuse@gmail.com';
const password = 'hello';

export default function AuthenticationScreen() {
    const [getSwitch, setSwitch] = useState(0)
    const [email, setEmail] = useState("")
    const onSelectSwitch = (index) => {
        setSwitch(index)
    }

    const viewLogin = () => {
        return (

            <View style={styles.form}>
                <Text style={styles.text}>Prêt à mettre les mains à la pâte ?</Text>
                <TextInput style={styles.form.input} placeholderTextColor={"lightgrey"} placeholder={"Email"}/>
                <TextInput style={styles.form.input} placeholderTextColor={"lightgrey"} placeholder={"Mot de passe"} secureTextEntry={true}/>
            </View>
        )
    }

    const viewLogout = () => {
        return (
            <View style={styles.form}>
                <TextInput style={styles.form.input} placeholderTextColor={"lightgrey"} placeholder={"Email"} onChangeText={ (e) => setEmail(e)}/>
                <TextInput style={styles.form.input} placeholderTextColor={"lightgrey"} placeholder={"Email"}/>
                <TextInput style={styles.form.input} placeholderTextColor={"lightgrey"} placeholder={"Email"}/>
                <TextInput style={styles.form.input} placeholderTextColor={"lightgrey"} placeholder={"Mot de passe"} secureTextEntry={true}/>
            </View>
        )
    }

    function validateData() {
        console.log({email})
        return undefined;
    }

    return (
        <View style={styles.container}>
            <Image style={styles.image} source={require('../../../assets/images/logo.png')}/>

            <Tabs
                buttons={['Se connecter', 'S\'inscrire']}
                onSelectSwitch={onSelectSwitch}
            />
            {getSwitch === 0 ? viewLogin() : viewLogout()}

            <TouchableHighlight>
                <Text onPress={validateData()} style={styles.button}>Envoyer</Text>
            </TouchableHighlight>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        justifyContent : "flex-start",
        alignItems: "center",
        flexGrow : 1,
        marginTop : 120
    },
    text: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
        maxWidth: 190,
        textAlign: 'center',
        marginVertical: 30
    },
    button: {
        backgroundColor: '#4E733D',
        paddingHorizontal : 75,
        paddingVertical : 13,
        borderRadius: 60,
        marginTop: 40
    },
    image: {
        resizeMode: "contain",
        width: '100%',
        maxWidth: 200,
        height: 50,
        marginBottom: 75
    },
    form: {
        width: '100%',
        maxWidth: 300,
        alignItems:'center',

        input: {
            borderBottomColor : "black",
            borderBottomWidth : 1,
            color:"black",
            placeHolderTextColor: "blue",
            width: '100%',
            maxWidth: 300,
            marginBottom: 25
        }
    }

})
