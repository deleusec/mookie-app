import React, {useEffect, useState} from "react";
import {Button, FlatList, Image, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import Listing from "../../components/Listing";
import {useIsFocused} from "@react-navigation/native";
import Tabs from "../../components/Tabs";

const GLOBAL = require('./../../variables/global')
const colors = require('./../../variables/colors')

export default function RecipeScreen({route, navigation}) {

    const id = route.params
    const isFocused = useIsFocused();

    const [isLoading, setLoading] = useState(true)
    const [isFavorite, setIsFavorite] = useState(false)

    const [recipe, setRecipe] = useState([])
    const [favorites, setFavorites] = useState([])
    const [ingredients, setIngredients] = useState([])
    const [images, setImages] = useState([])
    const [idRecipe, setIdRecipe] = useState("")
    const [mainImageUrl, setMainImageUrl] = useState("")

    /* SWITCH */
    const [getSwitch, setSwitch] = useState(0)
    const onSelectSwitch = (index) => {
        setSwitch(index)
    }

    const viewIngredients = () => {

        return (
            ingredients && <View style={{ flex:1, width: "100%", flexDirection:"row", flexWrap:"wrap", justifyContent:"center",marginBottom:50,paddingBottom:50, borderBottomWidth:2, borderColor:colors.green}}>
                {ingredients.map((item, index)=>{
                    if(item.ingredient.data.attributes.url){
                        const ingredient = item.ingredient.data.attributes
                        const imageUrl = GLOBAL.API_URL + ingredient.image.data.attributes.url
                    }
                    return(
                        item.ingredient.data.attributes.url && ingredient.image.data.attributes.url && <View key={index} style={{alignItems:"center", justifyContent:"center", padding: 10}}>
                            <Image resizeMode={'contain'} source={{uri:imageUrl}} style={{width: 75, aspectRatio: 2/2}}/>
                            {item.quantity &&<Text style={{fontSize:14, color:colors.maroon, fontFamily:'Poppins-Medium', width:100, textAlign:"center"}}>{item.quantity}</Text>}
                            <Text style={{fontSize:16, color:colors.maroon, fontFamily:'Poppins-Light', width:100, textAlign:"center"}}>{ingredient.name}</Text>
                        </View>
                    )
                })}
            </View>
        )
    }

    const viewUtensils = () => {
        return (
            <View>
                <Text>Utensils</Text>
            </View>
        )
    }

    useEffect(() => {
        /* reloading of functions when the page is focused */
        getRecipeByID(id);
        getFavorites();
        onSelectSwitch(0)

    }, [isFocused])

    useEffect(() => {
        if(favorites.includes(idRecipe)){
            setIsFavorite(true)
        } else {
            setIsFavorite(false)
        }

    }, [favorites, idRecipe])

    /* get the recipe by the past id of the recipe list */
    const getRecipeByID = async (id) => {
        /* Request from a remote URL  */
        try {
            const response = await fetch(`https://api-mookie.herokuapp.com/api/recipes/${id}?populate=images,Ingredient.ingredient.image,Steps`);
            const json = await response.json();

            /* data storage with useStates */
            setIngredients(json.data.attributes.Ingredient)
            setRecipe(json.data.attributes);
            setImages(json.data.attributes.images.data)
            setIdRecipe(json.data.id)
            setMainImageUrl(GLOBAL.API_URL + json.data.attributes.images.data[0].attributes.url)
        } catch (error) {
            /* there is an error in the request */
            console.error(error);
        } finally {
            /* when the request is completed the loading is passed to false */
            setLoading(false);
        }
    }

    const getFavorites = async ()=> {
        const result = await fetch('https://api-mookie.herokuapp.com/api/profiles/1?populate=*')
            .then(res => res.json())
            .then(json => {
                const favoritesId = json.data.attributes.recipes.data.map((item) => {
                    return item.id
                })

                setFavorites(favoritesId)
            })
    }

    const addFavorite = async () => {

        if(isFavorite){
            const filterFavorites = favorites.filter(item => {
                if(item !== idRecipe){
                    return item
                }
            })
            setFavorites(filterFavorites)
            const requestOptions = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    data : {
                        recipes : filterFavorites
                    }
                })
            };
            await fetch('https://api-mookie.herokuapp.com/api/profiles/1?populate=*', requestOptions)
                .then(response => response.json())
                .then(json => {
                    console.log(json.data.attributes.recipes)

                    setIsFavorite(false)
                })

        } else {
            const newFavorites = [idRecipe, ...favorites]
            setFavorites(newFavorites)

            const requestOptions = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    data : {
                        recipes : newFavorites
                    }
                })
            };
            await fetch('https://api-mookie.herokuapp.com/api/profiles/1?populate=*', requestOptions)
                .then(response => response.json())
                .then(json => {
                    console.log(json.data.attributes.recipes)
                    setIsFavorite(true)
                })
        }


    }

    return (
        <View style={{flex: 1, backgroundColor:colors.cream}}>
            {!isLoading &&
                <FlatList
                    contentContainerStyle={{paddingHorizontal: 15, paddingBottom: 75, position: "relative"}}
                    data={recipe.Steps}
                    ListHeaderComponent={() => {
                        return (
                            <View>
                                <Text style={{
                                    color: '#440203',
                                    fontSize: 18,
                                    textAlign: "center",
                                    fontFamily: "Poppins-Medium",
                                    paddingVertical: 50
                                }}>{recipe.title}</Text>

                                <TouchableOpacity style={{position: "absolute", top: 35, left: 25}}
                                                  onPress={() => navigation.goBack()}><Text style={{
                                    fontSize: 40,
                                    color: colors.yellow,
                                    marginBottom: 20
                                }}>{"<"}</Text></TouchableOpacity>
                                {!isLoading &&
                                    <Image source={{uri: mainImageUrl}} style={{aspectRatio: 6 / 4, borderRadius: 5}}/>}
                                {!isLoading && images.length > 1 &&
                                    <FlatList style={{paddingVertical: 15}} horizontal={true} data={images}
                                              renderItem={({item}) => {
                                                  return (
                                                      <TouchableOpacity style={{marginRight: 15}}
                                                                        onPress={() => setMainImageUrl(GLOBAL.API_URL + item.attributes.url)}>
                                                          <Image
                                                              source={{uri: GLOBAL.API_URL + "" + item.attributes.url}}
                                                              style={{
                                                                  aspectRatio: 6 / 5,
                                                                  width: 100,
                                                                  borderRadius: 5
                                                              }}/>
                                                      </TouchableOpacity>
                                                  )
                                              }}/>}

                                <View style={{
                                    backgroundColor: colors.green + "44",
                                    paddingVertical: 10,
                                    paddingHorizontal: 15,
                                    borderRadius: 5,
                                    marginVertical: 25,
                                    flexDirection: "row"
                                }}>
                                    <TouchableOpacity style={[styles.button, {marginRight: 10}]}>
                                        <Image source={require('../../../assets/images/share.png')}
                                               resizeMode={"contain"} style={{width: 20, height: 20, marginRight: 10}}/>
                                        <Text style={{
                                            fontFamily: "Poppins-Medium",
                                            fontSize: 16,
                                            marginBottom: -3
                                        }}>Partager</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={addFavorite} style={[isFavorite?styles.button.active:styles.button, {marginLeft: 10}]}>
                                        <Image source={require('../../../assets/images/heart.png')}
                                               resizeMode={"contain"} style={{width: 20, height: 20, marginRight: 10}}/>
                                        <Text style={{
                                            fontFamily: "Poppins-Medium",
                                            fontSize: 16,
                                            marginBottom: -3
                                        }}>Favori</Text>
                                    </TouchableOpacity>
                                </View>
                                {/*<View style={{flex:1, paddingVertical:50, alignItems:"center", justifyContent:"center"}}>
                                    <Tabs
                                        buttons={['Ingredients', 'Ustensiles']}
                                        onSelectSwitch={onSelectSwitch}
                                    />

                                    {getSwitch === 0 ? viewIngredients() : viewUtensils()}
                                </View>*/}



                            </View>
                        )
                    }}
                    renderItem={({item}) => {
                        return (
                            <View style={{paddingHorizontal: 15, paddingVertical: 18}}>
                                <Text style={{
                                    color: '#440203',
                                    fontFamily: "Poppins-Medium",
                                    fontSize: 18,
                                    marginBottom: 12
                                }}>Étape {item.step_number}</Text>
                                <Text style={{
                                    color: '#440203',
                                    fontFamily: "Poppins-Light",
                                    fontSize: 14
                                }}>{item.guideline}</Text>
                            </View>
                        )
                    }}
                />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    button:{
        backgroundColor:colors.green,
        fontSize:16,
        paddingVertical:10,
        paddingHorizontal:15,
        borderRadius:5,
        flex:1,
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        active: {
            backgroundColor: colors.maroon,
            fontSize:16,
            paddingVertical:10,
            paddingHorizontal:15,
            borderRadius:5,
            flex:1,
            flexDirection:"row",
            justifyContent:"center",
            alignItems:"center",
        }
    }
})
