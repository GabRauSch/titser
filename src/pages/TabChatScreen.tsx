import Main from "../components/Main"
import { FlatList, StyleSheet, Text, View } from "react-native"
import Header from "../components/Header"
import ChatListItem from "../components/ChatListItem"
import { createStackNavigator } from "@react-navigation/stack";
import ChatListScreen from "../components/chat/ChatListScreen";
import ChatScreen from "../components/chat/ChatScreen";

const Stack = createStackNavigator();
const TabChatScreen = ()=>{    
    return (
        <Stack.Navigator>
            <Stack.Screen name="ChatList" component={ChatListScreen} options={{headerShown: false}} />
            <Stack.Screen
                name="ChatScreen"
                component={ChatScreen}
                options={{headerShown: false}}
            />
        </Stack.Navigator>
    )
}

export default TabChatScreen

