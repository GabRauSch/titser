import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from 'react-native-vector-icons/FontAwesome';
import TabHomeScreen from '../pages/TabHomeScreen';
import TabLikeScreen from '../pages/TabLikeScreen';
import TabChatScreen from "../pages/TabChatScreen";
import TabProfileScreen from '../pages/TabProfileScreen'
import TabTest from '../pages/TabTests'
import { Text } from "react-native";

const Tab = createBottomTabNavigator();

const AppTabs = () => (
  <>
    <Text>oi</Text>
  </>
//   <Tab.Navigator
//     screenOptions={({ route }) => ({
//       tabBarIcon: ({ focused }) => {
//         let icon: string;
//         switch (route.name) {
//           case "tabhome":
//             icon = 'heart';
//             break;
//           case "tablikes":
//             icon = 'star';
//             break;
//           case "tabchat":
//             icon = 'comments';
//             break;
//           case "tabuser":
//             icon = 'user';
//             break;
//           default:
//             icon = 'heart';
//             break;
//         }
//         return <Icon name={icon} size={20} color={!focused ? '#fff' : '#a0f'} />;
//       },
//     })}
//     initialRouteName="tablikes"
// >
//     <Tab.Screen
//       name="tabhome" component={TabHomeScreen}
//       options={{ tabBarShowLabel: false, tabBarStyle: {backgroundColor: 'black', borderTopColor: 'black'}, headerShown: false}}
//     />
//     <Tab.Screen 
//         name="tablikes" component={TabLikeScreen} 
//             options={{ tabBarShowLabel: false, tabBarStyle: {backgroundColor: 'black', borderTopColor: 'black'}, headerShown: false}}        
//     />
//     <Tab.Screen 
//         name="tabchat" component={TabChatScreen} 
//             options={{ tabBarShowLabel: false, tabBarStyle: {backgroundColor: 'black', borderTopColor: 'black'}, headerShown: false}}
//     />
//     <Tab.Screen 
//         name="tabuser" component={TabProfileScreen} 
//             options={{ tabBarShowLabel: false, tabBarStyle: {backgroundColor: 'black', borderTopColor: 'black'}, headerShown: false}}
//     />
//     {/* <Tab.Screen 
//         name="tabtest" component={TabTest}
//           options={{tabBarShowLabel: false, tabBarStyle: {backgroundColor: 'black', borderTopColor: 'black'}, headerShown: false}}
//     /> */}
//   </Tab.Navigator>
);

export default AppTabs;
