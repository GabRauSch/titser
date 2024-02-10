import React, { useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from 'react-native-vector-icons/FontAwesome';
import TabHomeScreen from '../pages/TabHomeScreen';
import TabLikeScreen from '../pages/TabLikeScreen';
import TabChatScreen from "../pages/TabChatScreen";
import TabProfileScreen from '../pages/TabProfileScreen'
import TabTest from '../pages/TabTests'
import { Text } from "react-native";
import * as location from 'expo-location'
import { Dispatch } from "redux";
import { Location, setLocationAction } from "../reducers/locationReducer";
import { connect } from "react-redux";
import * as Api from '../apis/Titser'
import { RootState } from "../reducers";
import { LoggedUser } from "../reducers/userReducer";

const Tab = createBottomTabNavigator();

type Props = {
  setLocation: (payload: Location)=>void,
  user: LoggedUser
}

const AppTabs = ({setLocation, user}: Props) => {
  useEffect(()=>{
    const getLocationPerission = async ()=>{
      let { status } = await location.requestForegroundPermissionsAsync();
      if(status !== 'granted'){
        console.log('You need to grant permission')
        return;
      } 
      let currentLocation = await location.getCurrentPositionAsync({});
      const userLocation = {
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude
      }
      const response = await Api.setLocation(user.id, userLocation)
      console.log(response.data)
      setLocation(userLocation);
    }
    getLocationPerission()
  }, [])
  return (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused }) => {
        let icon: string;
        switch (route.name) {
          case "tabhome":
            icon = 'heart';
            break;
          case "tablikes":
            icon = 'star';
            break;
          case "tabchat":
            icon = 'comments';
            break;
          case "tabuser":
            icon = 'user';
            break;
          default:
            icon = 'heart';
            break;
        }
        return <Icon name={icon} size={20} color={!focused ? '#fff' : '#a0f'} />;
      },
    })}
    initialRouteName="tablikes"
>
    <Tab.Screen
      name="tabhome" component={TabHomeScreen}
      options={{ tabBarShowLabel: false, tabBarStyle: {backgroundColor: 'black', borderTopColor: 'black'}, headerShown: false}}
    />
    <Tab.Screen 
        name="tablikes" component={TabLikeScreen} 
            options={{ tabBarShowLabel: false, tabBarStyle: {backgroundColor: 'black', borderTopColor: 'black'}, headerShown: false}}        
    />
    <Tab.Screen 
        name="tabchat" component={TabChatScreen} 
            options={{ tabBarShowLabel: false, tabBarStyle: {backgroundColor: 'black', borderTopColor: 'black'}, headerShown: false}}
    />
    <Tab.Screen 
        name="tabuser" component={TabProfileScreen} 
            options={{ tabBarShowLabel: false, tabBarStyle: {backgroundColor: 'black', borderTopColor: 'black'}, headerShown: false}}
    />
    {/* <Tab.Screen 
        name="tabtest" component={TabTest}
          options={{tabBarShowLabel: false, tabBarStyle: {backgroundColor: 'black', borderTopColor: 'black'}, headerShown: false}}
    /> */}
  </Tab.Navigator>
  )
}

const mapStateToProps = (state: RootState)=>({
  user: state.userReducer.user
})

const mapDispatchToProps = (dispatch: Dispatch)=>({
  setLocation: (payload: Location)=>dispatch(setLocationAction(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(AppTabs);
