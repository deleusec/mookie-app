import React, {useEffect, useState} from "react";
import {
    ActivityIndicator,
    FlatList,
    Image,
    ImageBackground,
    ScrollView,
    Text,
    TouchableOpacity,
    Vibration,
    View
} from "react-native";
import colors from "../../variables/colors"
import GLOBAL from "../../variables/global"
import {useIsFocused} from "@react-navigation/native";

export default function DiscoveryPassScreen({navigation}){
    const isFocused = useIsFocused();
    const [isLoading, setIsLoading] = useState(true)
    const [imageUrl, setImageUrl] = useState('')
    const [discoveryTitle, setDiscoveryTitle] = useState('')

    /* Discovery */
    const [discovery, setDiscovery] = useState([])

    /* Gifts */
    const [gifts, setGifts] = useState([])

    /* Recipes */
    const [freeRecipes, setFreeRecipes] = useState([])
    const [premiumRecipes, setPremiumRecipes] = useState([])
    const [recipesNumber, setRecipesNumber] = useState([])

    /* Profile */
    const [tokensProfile, setTokensProfile] = useState(0)
    const [isPremium, setIsPremium] = useState(false)

    useEffect(()=>{
        getActualDiscovery()
    },[isFocused])

    useEffect(()=>{
        getRecipes()
    },[discovery])

    useEffect(()=>{
        getProfilesData()
    },[freeRecipes, premiumRecipes])

    useEffect(()=>{
        if(freeRecipes.length >= premiumRecipes.length){
            let number = 0;
            let numberArray = [];
            for(let i=0; i<freeRecipes.length;i++){
                numberArray.push(number++)
            }
            setRecipesNumber(numberArray)
        } else {
            let number = 0;
            let numberArray = [];
            for(let i=0; i<premiumRecipes.length;i++){
                numberArray.push(number++)
            }
            setRecipesNumber(numberArray)
        }
    },[freeRecipes, premiumRecipes])

    const getActualDiscovery = async () => {
        const date = new Date()
        try {
            const discovery = await fetch('https://api-mookie.herokuapp.com/api/discovery-passes?populate=image,Gifts.gift,Gifts.gift.image')
            const json = await discovery.json();

            console.log(json.data)

            const actualDiscoveryPass = json.data.filter((discovery) => {
                console.log(discovery)
                const begin = new Date(discovery.attributes.begin_date);
                const end = new Date(discovery.attributes.end_date);

                if (date > begin && date < end) {
                    return discovery

                }
            })
            setImageUrl(GLOBAL.API_URL + actualDiscoveryPass[0].attributes.image.data.attributes.url)
            setDiscoveryTitle(actualDiscoveryPass[0].attributes.titre)
            setDiscovery(...actualDiscoveryPass)
            setGifts(actualDiscoveryPass[0].attributes.Gifts)

        } catch (error) {
            console.error({error})
        }
    }

    const getRecipes = async () => {
        try {
            // Get Recipes Data
            const recipes = await fetch('https://api-mookie.herokuapp.com/api/discovery-passes/1?populate=FreeRecipes.free_recipe.images,PremiumRecipes.recipe.images', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            const json = await recipes.json();

            setFreeRecipes(json.data.attributes.FreeRecipes)
            setPremiumRecipes(json.data.attributes.PremiumRecipes)

        } catch (error) {
            console.error({error})
        }
    }

    const getProfilesData = async () => {
        try {
            // Get Recipes Data
            const profile = await fetch('https://api-mookie.herokuapp.com/api/profiles/1?populate=*', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            const json = await profile.json();
            const premiumPasses = json.data.attributes.premium_passes.data;

            setIsPremium(false)
            premiumPasses.map(item => {
                if(item.id === discovery.id){
                    setIsPremium(true)
                }
            })

            setTokensProfile(json.data.attributes.tokens)

        } catch (error) {
            console.error({error})
        } finally {
            setIsLoading(false)
        }
    }



    return(
        isLoading ? <ActivityIndicator/>
            :<ScrollView style={{flex: 1,backgroundColor:colors.cream,}} contentContainerStyle={{paddingBottom:75}}>
            {imageUrl !== "" && <ImageBackground style={{width: "100%",aspectRatio:5/2,position:"relative", alignItems:"center", justifyContent:"center"}} borderBottomLeftRadius={20} borderBottomRightRadius={20} source={{uri: imageUrl}}>
                <Text style={{color:colors.white, fontSize:30, fontFamily:'Poppins-Medium', }}>{discoveryTitle}</Text>
            </ImageBackground>}

            <Text style={{fontSize: 22, fontFamily: 'Poppins-Medium', color:colors.maroon, paddingTop:50, paddingBottom: 15, alignSelf:"center"}}>Lots du mois</Text>
            <View style={{flexDirection:"row",width:"100%", paddingHorizontal: 20, marginBottom:25}}>
            {!isLoading && gifts.map((item)=>{
                const name = item.gift.data.attributes.name
                const urlImage = item.gift.data.attributes.image.data.attributes.url
                const requiredToken = item.gift.data.attributes.required_token

                return(
                    <TouchableOpacity key={item.id} activeOpacity={0.7} style={{alignItems:"center",width:100, flex:1, padding:10}}>
                        <Text style={{fontSize:16, color:colors.maroon, fontFamily:'Poppins-Light'}}>{name}</Text>
                        <Image source={{uri:GLOBAL.API_URL+urlImage}} style={{aspectRatio: 2/2, width:"100%", borderColor:colors.yellow, borderWidth:2,borderRadius:5}}/>
                        <Text style={{backgroundColor:colors.green, fontSize:16, fontFamily:'Poppins-Medium', width:"100%",textAlign:"center", borderRadius:5,paddingVertical:2, color:colors.white,marginTop:10}}>{requiredToken}T</Text>
                    </TouchableOpacity>
                )
            })}
            </View>


            <View style={{width: "100%", paddingHorizontal: 25,paddingTop: 25, flexDirection: "row"}}>
                <View style={{flex: 2}}>
                    <TouchableOpacity activeOpacity={0.7} style={{backgroundColor:colors.yellow, paddingHorizontal: 25, paddingVertical: 12, borderRadius : 5, alignItems: "center"}}>
                        <Text style={{fontSize: 16, fontFamily: "Poppins-Medium"}}>Débloquer</Text>
                    </TouchableOpacity>
                    <View style={{backgroundColor:colors.green, height: 80, alignItems:"center", justifyContent:"center", borderRadius: 5, marginTop: 12}}>
                        <Image source={require("../../../assets/images/crown.png")} resizeMode={"contain"} style={{width: 20, height:20, tintColor:colors.yellow}}/>
                    </View>
                </View>
                <View style={{flex: 1}}></View>
                <View style={{flex: 2}}>
                    <View style={{borderColor:colors.maroon, borderWidth:2, paddingHorizontal: 5, paddingVertical: 12, borderRadius : 5, alignItems: "center"}}>
                        <Text style={{fontSize: 16, fontFamily: "Poppins-Medium", color:colors.maroon}}>Tokens : {tokensProfile}T</Text>
                    </View>
                    <View style={{backgroundColor:colors.green+"44", height: 80, alignItems:"center", justifyContent:"center", borderRadius: 5, marginTop: 12}}>
                        <Text style={{fontFamily:'Poppins-Medium', fontSize: 16, color: colors.green}}>Gratuit</Text>
                    </View>
                </View>
            </View>


            <View style={{width: "100%", padding: 25, flexDirection: "row"}}>
                <View style={{flex: 2, backgroundColor:colors.green, borderRadius:5, paddingVertical:30}}>
                    {!isLoading && premiumRecipes.map((item)=>{
                        const data = item.recipe.data;
                        const imageData = data.attributes.images.data[0]
                        const imageUrl = GLOBAL.API_URL + imageData.attributes.url;

                        return(
                            isPremium?<TouchableOpacity onPress={() => navigation.navigate('Recipe', data.id)} activeOpacity={0.7} key={data.id} style={{paddingVertical:10, marginHorizontal:25}}>
                                    <Image source={{uri:imageUrl}} style={{width:"100%", aspectRatio:2, borderRadius:5}}/>
                                </TouchableOpacity>
                                :
                                <View style={{paddingVertical:10, marginHorizontal:25}} key={data.id}>
                                    <ImageBackground source={{uri:imageUrl}} key={data.id} style={{aspectRatio:2}} borderRadius={5} >
                                        <View style={{width:"100%", height:"100%", backgroundColor:"#00000066", borderRadius:5, justifyContent:"center", alignItems:"center"}}><Image resizeMode={"contain"} style={{width:20, height:20}} source={require('../../../assets/images/lock.png')}/></View>
                                    </ImageBackground>
                                </View>
                        )
                    })}
                </View>
                <View style={{flex: 1, paddingVertical:50, justifyContent:"space-between", alignItems:"center"}}>
                    {!isLoading && recipesNumber.map(item => {
                        return(
                            <View key={item} style={{}}>
                                <Text style={{backgroundColor: colors.maroon,color:colors.white+"AA", textAlignVertical:"center", textAlign:"center", width:50, height:25, borderRadius:5}}>NIV</Text>
                            </View>
                        )
                    })}
                </View>
                <View style={{flex: 2, backgroundColor:colors.green+'44', borderRadius:5, paddingVertical:30}}>
                    {!isLoading && freeRecipes.map((item)=>{
                        const data = item.free_recipe.data;
                        const imageData = data.attributes.images.data[0];
                        const imageUrl = GLOBAL.API_URL + imageData.attributes.url;

                        return(
                            <TouchableOpacity onPress={() => navigation.navigate('Recipe', data.id)} activeOpacity={0.7} key={data.id} style={{paddingVertical:10, marginHorizontal:25}}>
                                <Image source={{uri:imageUrl}} style={{width:"100%", aspectRatio:2, borderRadius:5}}/>
                            </TouchableOpacity>
                        )
                    })}
                </View>
            </View>

        </ScrollView>
    )
}
