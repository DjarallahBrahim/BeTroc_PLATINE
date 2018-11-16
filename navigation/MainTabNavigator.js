//react imports
import React from 'react';
import { Platform, StyleSheet, Image} from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

//Components imports
import { Plusbutton } from '../components/Components_TabBar/Plusbutton';
import TabBarIcon from '../components/Components_TabBar/TabBarIcon';

//screen imports
import HomeScreen from '../screens/HomeScreen';
import MessageScreen from '../screens/MessageScreen';
import AddAnnonceScreen from '../screens/AddAnnonceScreen';
import ProfilScreen from '../screens/ProfilScreen';
import MapScreen from '../screens/MapScreen';
import Annoncedetailscreen from "../screens/Annoncedetailscreen";
import PicDetail from "../components/Components_Annonce/Components_Detail/PicDetail";

//Stack-Navigator creation with navigationOptions

const HomeStack = createStackNavigator({
    Home: HomeScreen,
    AnnonceDetail: Annoncedetailscreen,
    PicDetail:PicDetail



});

HomeStack.navigationOptions = ({ navigation }) => {
    let { routeName } = navigation.state.routes[navigation.state.index];
    let navigationOptions = {};

    if (routeName !== 'Home') {
        navigationOptions.tabBarVisible = false;
    }
    navigationOptions.tabBarIcon= ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name={Platform.OS === 'ios' ? `ios-home${focused ? '' : '-outline'}` : 'md-home'}
        />
    );

    return navigationOptions;
};


const MessageStack = createStackNavigator({
  Message: MessageScreen,
});

MessageStack.navigationOptions = {
  tabBarLabel: 'Message',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-chatbubbles${focused ? '' : '-outline'}` : 'md-chatbubbles'}
    />
  ),
   };

const AddAnnonceStack = createStackNavigator({
  Plus: AddAnnonceScreen,
});

AddAnnonceStack.navigationOptions = {
        tabBarIcon: ({focused}) => (
            <Plusbutton focused={focused}/>
        ),

};

const ProfilStack = createStackNavigator({
    Profil: ProfilScreen,

});

ProfilStack.navigationOptions =({ navigation }) => {
    let { routeName } = navigation.state.routes[navigation.state.index];
    let navigationOptions = {};

    if (routeName !== 'Profil') {
        navigationOptions.tabBarVisible = false;
    }
    navigationOptions.tabBarIcon= ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name={Platform.OS === 'ios' ? `ios-person${focused ? '' : '-outline'}` : 'md-person'}
        />
    );

    return navigationOptions;
};

const MapScreenStack = createStackNavigator({
    Map: MapScreen,
});

MapScreenStack.navigationOptions = {
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name={Platform.OS === 'ios' ? `ios-map${focused ? '' : '-outline'}` : 'md-map'}
        />
    ),
};

//Creation of Bottom tab navigator and push to it our Stack
export default createBottomTabNavigator(
    {
        HomeStack,
        MessageStack,
        AddAnnonceStack,
        MapScreenStack,
        ProfilStack
    },
    {
        tabBarOptions: {
        showLabel:false,
    },
        style: {
            alignItems: 'center',
            borderTopWidth: 0,

    },

});
