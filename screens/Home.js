import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, FlatList, ScrollView } from 'react-native';
import {Header, ListItem} from 'react-native-elements'
import db from '../db'
import firebase from 'firebase'

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            itemsList: [],
        }
    }
    
    getItems = async()=>{
        await db.collection("items").get()
        .then(snapshot=>{
            this.setState({itemsList: snapshot.docs.map(doc => doc.data())})
        }).catch(err=>{alert(err)})
    }

    getUserDetails = ()=>{
        firebase.auth().onAuthStateChanged(user=>{
            if(!user){
                this.props.navigation.navigate("Auth")
            }else{
                this.getItems()
                // alert("Welcome to Barter System App!")
            }
            
        })
    }

    componentDidMount() {
        this.getItems()
    }

    renderItems = ({item, i})=>{
        return(
            <ListItem
                key = {i}
                title = {item.itemName}
                subtitle = {item.description}
                titleStyle = {{color:"black"}}
                bottomDivider
            />
        )
    }

    render() {
        return(
            <View style={styles.container}>
                <Header
                    centerComponent = {{text:"Barter System App", style:styles.headerText}}
                />
                {/* <Text>This is the home page!</Text> */}
                <ScrollView>
                    {this.state.itemsList.length === 0 ? 
                    <Text>Loading...{this.state.itemsList.length} items found so far...</Text>:
                    <FlatList
                        keyExtractor={this.keyExtractor}
                        data={this.state.itemsList}
                        renderItem={this.renderItems}
                    />}
                </ScrollView>
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerText: {
        color: "#ffffff",
        fontSize:24,
        fontWeight:'bold',
        marginVertical:10
    }
})