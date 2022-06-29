/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import * as React from 'react';
import MainNavigation from "./src/routes/Main";
import AuthenticationScreen from "./src/screens/Authentication";
import User from "./src/app/classes/User";
import {useEffect, useState} from "react";
import {Alert, Button, View} from "react-native";

const user = new User();

const App = () => {
    const [token, setToken] = useState("")


    const validateLogin = (email, password) => {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                identifier : email,
                password : password
            })
        };
        fetch('https://api-mookie.herokuapp.com/api/auth/local', requestOptions)
            .then(response => response.json())
            .then(json => {
                if(json.data === null){
                    let messages = "";
                    if (json.error.message) {
                        messages = json.error.message
                    }
                    if(json.error.details !== {}){
                        messages = "";
                        json.error.details.errors.forEach((item) => {
                            messages = messages+"\n"+item.message

                        })
                    }


                    Alert.alert(
                        "Erreur d'authentification",
                        messages,
                        [
                            { text: "OK" }
                        ]
                    );

                }

                if(json.jwt){
                    setToken(json.jwt)
                    user.token = json.jwt;

                    console.log(user.token)
                }

            })
            .catch(e=>{
                console.error(e)
            })
    }

    return (
        token !== "" ? (
            <AuthenticationScreen user={user} validateLogin={validateLogin}/>
            ) : (
            <MainNavigation/>
            )

    )
};


export default App;
