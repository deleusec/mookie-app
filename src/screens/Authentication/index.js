import * as React from 'react';
import {useState} from 'react';
import {Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import Tabs from "../../components/Tabs";
import colors from "../../variables/colors"

export default function AuthenticationScreen(props) {
    /* USER INFO */
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    /* SWITCH */
    const [getSwitch, setSwitch] = useState(0)
    const onSelectSwitch = (index) => {
        setSwitch(index)
    }

    const validateLogin =()=> {
        props.validateLogin(email, password)
    }

    const viewLogin = () => {
        return (
            <View style={styles.form}>
                <Text style={styles.text}>Prêt à mettre les mains à la pâte ?</Text>
                <TextInput style={styles.formInput} placeholderTextColor={"lightgrey"} placeholder={"Email"} onChangeText={(e) => setEmail(e)}/>
                <TextInput style={styles.formInput} placeholderTextColor={"lightgrey"} placeholder={"Mot de passe"} onChangeText={ (e) => setPassword(e)} secureTextEntry={true}/>
                <TouchableOpacity
                    activeOpacity={0.6}
                    underlayColor={"#DDDDDD"}>
                        <Text onPress={validateLogin} style={styles.button}>Envoyer</Text>
                </TouchableOpacity>
            </View>
        )
    }

    const viewLogout = () => {
        return (
            <View style={styles.form}>
                <TextInput style={styles.formInput} placeholderTextColor={"lightgrey"} placeholder={"Email"} onChangeText={ (e) => setEmail(e)}/>
                <TextInput style={styles.formInput} placeholderTextColor={"lightgrey"} placeholder={"Mot de passe"} onChangeText={ (e) => setPassword(e)} secureTextEntry={true}/>
            </View>
        )
    }


    return (
        <View style={styles.container}>
            <Image style={styles.image} source={require('../../../assets/images/logo.png')}/>

            <Tabs
                buttons={['Se connecter', 'S\'inscrire']}
                onSelectSwitch={onSelectSwitch}
            />
            {getSwitch === 0 ? viewLogin() : viewLogout()}
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        justifyContent : "flex-start",
        alignItems: "center",
        flexGrow : 1,
        paddingTop : 120,
        backgroundColor:colors.cream
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
        color: colors.white,
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


    },

    formInput: {
        borderBottomColor : "black",
        borderBottomWidth : 1,
        color:"black",
        width: '100%',
        maxWidth: 300,
        marginBottom: 25
    }

})
