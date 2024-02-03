import Main from "../components/Main"
import { FlatList, StyleSheet, Text, View } from "react-native"
import Header from "../components/Header"
import ChatListItem from "../components/ChatListItem"

const TabChatScreen = ()=>{    
    const data = [
        {
          id: '1',
          name: 'John Doe',
          lastMessage: 'I love coding.',
          photo: 'uus.jpg',
          read: false
        },
        {
            id: '2',
            name: 'segundo',
            lastMessage: 'I love coding.',
            photo: 'uus.jpg',
            read: true
          },
      ];
    return <>
        <Header />
        <View style={styles.container}>
            <FlatList style={styles.list}
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                <ChatListItem
                    name={item.name}
                    lastMessage={item.lastMessage}
                    photo={item.photo}
                    read={item.read}
                />
                )}
            />
        </View>
    </>
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: 'black',
        height: '100%'
    },
    list: {
        color: "#fff",
        backgroundColor: 'black'
    }
})

export default TabChatScreen

