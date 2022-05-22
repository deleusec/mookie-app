import React, {useState} from "react";
import {ScrollView, StyleSheet} from "react-native";
import Listing from "../../components/Listing";
import {Searchbar} from "react-native-paper";
import Search from "../../components/Search";

const data = require('../../../bdd.json');

export default function RecipesScreen({navigation}) {
    const [searchValue, setSearchValue] = useState("")
    const [searchData, setSearchData] = useState([])

    function onSearch(text) {
        const dataCopy = data.recipes
        setSearchData([])
        setSearchValue(text)

        setSearchData(dataCopy.filter(val => {
            if(val.title.toLowerCase().includes(text.toLowerCase()) && text.length !== 0){
                return val
            }
        }))


        console.log(searchData)
    }


    return (
        <ScrollView style={ styles.container }>
            <Searchbar style={styles.searchBar} iconColor={'#4E733D'} selectionColor={'#4E733D'} placeholder={"Search"} icon={require('../../../assets/images/search.png')} onChangeText={(text) => onSearch(text)} />
            {searchValue!=="" && <Search data={searchData} navigation={navigation} style={styles.overlay}/>}
            <Listing data={data.recipes} navigation={navigation}>Recettes</Listing>
            <Listing data={data.recipes} navigation={navigation}>Recette de saison</Listing>
            <Listing data={data.recipes} navigation={navigation}>Desserts</Listing>
            <Listing data={data.recipes} navigation={navigation}>Desserts</Listing>
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    container : {
        backgroundColor :"#FBF7EF",
        flex:1,
        paddingHorizontal:15,
    },
    searchBar: {
        zIndex:10,
        backgroundColor:"rgba(78, 115, 61, 0.25)",
        borderRadius:50,
        marginTop:50,
        marginBottom:15,
        shadowColor:'transparent',
    }
})
