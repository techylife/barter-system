import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createSwitchNavigator, createAppContainer} from "react-navigation"
import {createBottomTabNavigator} from 'react-navigation-tabs'
import Home from './screens/Home'
import Auth from './screens/Auth';
import Exchange from './screens/Exchange';
import firebase from 'firebase'

export default function App() {
  return (
    <AppContainer/>
  );
}

const BottomTab = createBottomTabNavigator({
  Home:{
    screen:Home,
    navigationOptions:{
      title:"Home"
    }
  },
  Exchange:{
    screen:Exchange,
    navigationOptions:{
      title:"Exchange"
    }
  }
})

const switchNav = createSwitchNavigator({
  Auth:{
    screen:Auth
  },
  BottomTab:{
    screen:BottomTab
  }
})

const AppContainer = createAppContainer(switchNav)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
