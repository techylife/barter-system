import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import db from '../db'
import firebase from 'firebase'

export default class Auth extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email:"",
            pass:""
        }
    }

    login = ()=>{
        var email = this.state.email
        var pass = this.state.pass

        if (email!==""){
            if(pass!==""){
                firebase.auth().signInWithEmailAndPassword(email, pass).then(user=>{
                    alert("User signed in!")
                    this.props.navigation.navigate('BottomTab')
                }).catch(err=>{
                    alert(err)
                })
            }else{
                alert("Please enter the email~")
            }
        }else{
            alert("Please enter the password!")
        }
    }

    render() {
        return(
            <View style={styles.container}>
                <Text style={styles.headerText}>Login</Text>
                <TextInput keyboardType={'email-address'} style={styles.input} placeholder="E-mail" onChangeText={text=>{this.setState({email:text})}}/>
                <TextInput secureTextEntry={true} style={styles.input} placeholder="Password" onChangeText={text=>{this.setState({pass:text})}}/>
                <TouchableOpacity style={styles.button} onPress={()=>{this.login()}}><Text style={styles.buttonText}>Login</Text></TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        paddingHorizontal:40
    },
    headerText:{
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