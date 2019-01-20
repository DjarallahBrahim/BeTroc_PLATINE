import React from 'react';
import { createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import LoginScreen from "../screens/LoginScreen";
import SplashScreen from "../screens/SplashScreen";
import MapScreen from "../screens/MapScreen";
import AddAnnonceScreen from "../screens/AddAnnonceScreen";

export default createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    Splash:SplashScreen,
    Main: MainTabNavigator,
    Auth: LoginScreen,
    Map: MapScreen,
    Plus: AddAnnonceScreen,


});