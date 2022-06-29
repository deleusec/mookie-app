import React, {useEffect, useState} from "react";
import {ActivityIndicator, Button, RefreshControl, ScrollView, SectionList, StyleSheet, Text, View} from "react-native";
import Listing from "../../components/Listing";
import {Searchbar} from "react-native-paper";
import Search from "../../components/Search";
import Item from "../../components/Item";
import GLOBAL from "../../variables/global";


const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

export default function RecipesScreen({navigation}) {
    const [isLoading, setLoading] = useState(true)

    const [searchValue, setSearchValue] = useState("")
    const [searchData, setSearchData] = useState([])
    const [recipes, setRecipes] = useState([])
    const [dessert, setDessert] = useState([])
    const [dinner, setDinner] = useState([])
    const [refreshing, setRefreshing] = useState(false);
    const [isSearch, setIsSearch] = useState(false);

    const getRecipes = async () => {
        try {
            const response = await fetch('https://api-mookie.herokuapp.com/api/recipes?populate=images&pagination[pageSize]=8');
            const dessert = await fetch('https://api-mookie.herokuapp.com/api/recipes?populate=images&pagination[pageSize]=8&filters[categories][name][$eq]=Dessert');
            const dinner = await fetch('https://api-mookie.herokuapp.com/api/recipes?populate=images&pagination[pageSize]=8&filters[categories][name][$eq]=Plat');
            const json = await response.json();
            const dessertJson = await dessert.json();
            const dinnerJson = await dinner.json();

            setRecipes(json.data);
            setDessert(dessertJson.data);
            setDinner(dinnerJson.data);

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false)
        }
    }


    useEffect(() => {
        getRecipes();
    },[refreshing])

    const onSearch = async (text) =>{
        setIsSearch(true)
        setSearchData([])
        try {
            const response = await fetch('https://api-mookie.herokuapp.com/api/recipes?populate=images');
            const json = await response.json();


            const data = json.data.filter(item => {
                if (item.attributes.title.toLowerCase().includes(text.toLowerCase()) && text.length !== 0) {
                    return item
                }
            })
            if(text.length === 0){
                setIsSearch(false)
            }

            console.log(data)
            setSearchData(data)
            setSearchValue(text)

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false)
        }



    }

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(500).then(() => {
            setRefreshing(false)
        });
    }, []);


    return (
        isLoading ? <ActivityIndicator/>
        :<ScrollView contentContainerStyle={{paddingBottom:75}} style={ styles.container } refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/> }>
            <Searchbar onSubmitEditing={()=>navigation.navigate('SearchResult', searchData)} style={styles.searchBar} iconColor={'#4E733D'} selectionColor={'#4E733D'} placeholder={"Search"} icon={require('../../../assets/images/search.png')} onChangeText={(text) => onSearch(text)} />
                {isSearch ? <Search data={searchData} navigation={navigation} style={styles.overlay}/>
                :   <View>
                        <Listing data={recipes} navigation={navigation}>Recettes</Listing>
                        <Listing data={dinner} navigation={navigation}>Plats</Listing>
                        <Listing data={dessert} navigation={navigation}>Desserts</Listing>
                    </View>
                }

        </ScrollView>
    )
}


const styles = StyleSheet.create({
    container : {
        backgroundColor :"#FBF7EF",
        flex:1,
        paddingBottom: 150
    },
    searchBar: {
        zIndex:10,
        marginHorizontal:15,
        backgroundColor:"rgba(78, 115, 61, 0.25)",
        borderRadius:50,
        marginTop:50,
        marginBottom:15,
        shadowColor:'transparent',
    }
})
