import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { Header } from 'react-native-elements';
import db from '../db';
import firebase from 'firebase'

export default class Exchange extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            itemName:"",
            description:"",
            // exchangeWorth:"",
            email:"",
            uid:"",
            userName:"",
        }
    }

    getUserDetails = async()=>{
        await firebase.auth().onAuthStateChanged(user=>{
            if(!user){
                this.props.navigation.navigate("Auth")
            }else{
                this.setState({
                    email:user.email,
                    uid:user.uid,
                    userName:user.displayName
                })
            }
            
        })
    }

    addItem = async()=>{
        var itemName = this.state.itemName
        var description = this.state.description
        // var exchangeWorth = this.state.exchangeWorth
        var email = this.state.email
        var uid = this.state.uid
        var userName = this.state.userName
        var timestamp = new Date().getTime()

        await db.collection("items").add({
            email: email,
            uid: uid,
            userName: userName,
            itemName: itemName,
            description: description,
            // exchangeWorth: exchangeWorth,
            timestamp:timestamp
        }).then(doc=>{
            alert("Your item has been added in the list with the id : "+doc.id)
        }).catch(err=>{
            alert(err)
        })
    }

    componentDidMount(){
        this.getUserDetails()
    }

    render() {
        return(
            <View style={styles.container}>
                <Header
                    centerComponent = {{text:"Barter System App", style:styles.headerText}}
                />
                <View style={styles.holder}>
                    
                    <Text style={styles.headText}>Login</Text>
                    <TextInput style={styles.input} placeholder="Item Name" onChangeText={text=>{this.setState({itemName:text})}}/>
                    <TextInput multiline={true} numberOfLines={10} style={styles.input} placeholder="Description (Max 10 lines)" onChangeText={text=>{this.setState({description:text})}}/>
                    {/* <TextInput style={styles.input} placeholder="Exchange Worth" onChangeText={text=>{this.setState({description:text})}}/> */}
                    <TouchableOpacity style={styles.button} onPress={()=>{this.addItem()}}><Text style={styles.buttonText}>Add</Text></TouchableOpacity>
                </View>
            </View>
            
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    holder: {
        flex: 1,
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        paddingHorizontal:40
    },
    headerText: {
        color: "#ffffff",
        fontSize:24,
        fontWeight:'bold',
        marginVertical:10
    },
    headText:{
        alignSelf:'center',
        fontSize:32,
        fontWeight:'bold',
        marginVertical:20,
        color:"lightblue"
    },
    input:{
        width:"75%",
        borderColor:"#215cde",
        borderRadius:15, 
        marginBottom:10    ,
        borderWidth:2,
        paddingHorizontal:18,
        paddingVertical:4   
    },
    button:{
        margin:100,
        backgroundColor:"lightblue",
        borderRadius:50,
        paddingHorizontal:40,
        paddingVertical:15
    },
    buttonText:{
        color:"white",
        fontSize:18
    }
})