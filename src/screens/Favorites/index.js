import React, {useEffect, useState} from "react";
import {FlatList, Image, Text, TouchableOpacity, View} from "react-native";
import Listing from "../../components/Listing";
import GLOBAL from '../../variables/global'
import colors from '../../variables/colors'
import {useIsFocused} from "@react-navigation/native";

export default function FavoritesScreen({navigation}) {

    const isFocused = useIsFocused();
    const [isLoading, setLoading] = useState(true)

    const [nameUser, setNameUser] = useState("")
    const [recipes, setRecipes] = useState([])

    useEffect( ()=>{

        const result = fetch('https://api-mookie.herokuapp.com/api/users/1?populate=profiles.recipes.images')
            .then(res => res.json())
            .then((result) => {
                setRecipes(result.profiles[0].recipes)
            })
            .catch(error => {
                console.error({error})
            })
            .finally(()=> {
                setLoading(false)
            })
    },[isFocused])

    return (
        <View style={{flex:1,backgroundColor:colors.cream}}>
            <Text style={{fontSize:22, paddingTop:30, paddingBottom: 15, fontFamily:"Poppins-Medium", color:colors.maroon, paddingHorizontal:15}}>Vos recettes Favorites<Image source={require('../../../assets/images/heart_cartoon.png')} resizeMode={"contain"} style={{width: 35, height: 35, marginRight: 10}}/></Text>
            {isLoading === false && <FlatList contentContainerStyle={{paddingHorizontal:10}} keyExtractor={item => item.id} numColumns={2} data={recipes} renderItem={({item})=> {

                return(
                    <TouchableOpacity activeOpacity={0.7} style={{width:"50%" , alignItems:"center", padding: 5}} onPress={() => navigation.navigate('Recipe', item.id)}>
                        <Image source={{uri: GLOBAL.API_URL +"" +item.images[0].url}} style={{ width:"100%", aspectRatio: 5/6,borderWidth:2,borderColor:colors.yellow, borderRadius: 5}}/>
                        <Text style={{
                            width:"100%",
                            color: '#440203',
                            fontFamily: "Poppins-Light",
                            fontSize: 14}}>{item.title}</Text>
                    </TouchableOpacity>
                )
            }}/>
            }
        </View>
    )
}
