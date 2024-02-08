import { useRoute } from '@react-navigation/native';
import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { io, Socket } from 'socket.io-client';
import { backendIP, backendPort, chatServicePort } from '../../apis/BackendAdress';
import { Dispatch } from 'redux';
import { RootState } from '../../reducers';
import { connect } from 'react-redux';
import { LoggedUser } from '../../reducers/userReducer';
import * as Api from '../../apis/Titser'
import { Chat, createNewMessageToChat, setChatsAction } from '../../reducers/chatsReducer';
import { removeMatchAction } from '../../reducers/matchesReducer';

export interface ChatMessage { 
  photo: string,
  customName: string,
  messageContent: string,
  userIdFrom: number,
  userIdTo: number
  messageDate?: number,
  seen?: boolean,
  direction?: string,
  id?: number,
}

interface RouteParams {
  otherUserId: number;
  photo: string;
  userName: string;
  room: string;
}

interface Props {
  user: LoggedUser;
  createMessage: (payload: ChatMessage)=>void;
  removeMatch: (payload: number)=>void
}

const ChatScreen = (props: Props) => {
  const [messagesSent, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState<string>('');
  const route = useRoute();
  const { otherUserId, photo, userName, room } = route.params as RouteParams;
  const socketRef = useRef<Socket | null>(null);
  const scrollViewRef = useRef<ScrollView>(null);

  const scrollToBottom = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: false });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messagesSent]);

  useLayoutEffect(() => {
    scrollToBottom();
  }, []);

  useEffect(() => {
    const loadMessages = async () => {
      const data = await Api.retrieveMessages(props.user.id, otherUserId, [0]);
      const messages: ChatMessage[] = data.data;
      if (messages) {
        setMessages(messages);
      }
    };
  
    if (otherUserId) {
      loadMessages();
    }
  
    socketRef.current = io(`http://${backendIP}:${chatServicePort}`, {
      query: { room, userName },
    });
  
    socketRef.current.on('connect', () => {
      console.log('Socket connected');
    });
  
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [otherUserId]);
  

  const sendToBackend = async ()=>{
    const result = await Api.sendMessage(props.user.id, otherUserId, inputText);
    console.log(result.data)
  }
  const sendMessage = () => {
    if(inputText == ''){
      return false
    }
    try {
      if (socketRef.current) {
        const newMessage: ChatMessage = {
          photo,
          customName: userName,
          userIdFrom: props.user.id,
          userIdTo: otherUserId,
          messageContent: inputText,
        };
    
        socketRef.current.emit('message', newMessage); 
        props.createMessage(newMessage)
        props.removeMatch(otherUserId)
        setMessages((prevMessages) => [...prevMessages, newMessage]);

        sendToBackend()
        setInputText('')
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image
            source={{ uri: `http://${backendIP}:${backendPort}/images/${photo}` }}
            style={styles.profilePhoto}
          />
        <Text style={styles.headerText}>{userName}</Text>
      </View>
      <ScrollView 
        ref={scrollViewRef}
        style={styles.messagesContainer}
        contentContainerStyle={styles.contentContainer}>
        {messagesSent.map((msg, index) => (
          <View key={index} style={msg.userIdFrom === otherUserId ? styles.otherMessage : styles.myMessage}>
            <Text style={msg.userIdFrom === otherUserId ? styles.otherMessageText : styles.myMessageText}>{msg.messageContent}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder='Type a message for them <3'
          placeholderTextColor='gray'
          value={inputText}
          onChangeText={(text) => setInputText(text)}
        />
        <TouchableOpacity style={styles.buttonContainer} onPress={sendMessage}>
          <Text style={styles.buttonText}>send</Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
    backgroundColor: '#222'
  }, 
  header: {
    alignItems: 'center',
    marginBottom: 16,
  }, 
  headerText: {
    fontSize: 16,
    color: '#ccc'
  },
  messagesContainer: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  myMessageText: {
    padding: 8,
    marginRight: 15,
    lineHeight: 21,
    backgroundColor: '#a0f',
    borderTopLeftRadius: 7,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 2,
    maxWidth: 300,
    fontSize: 15,
    color: 'white'
  },
  otherMessageText: {
    marginLeft: 15,
    padding: 8,
    lineHeight: 21,
    backgroundColor: '#777',
    borderTopRightRadius: 7,
    borderTopLeftRadius: 5,
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 2,
    maxWidth: 300,
    fontSize: 15,
    color: 'white'
  },
  buttonContainer: {
    backgroundColor: '#a0f',
    borderRadius: 10,
    padding: 12,
    paddingHorizontal: 30
  },
  buttonText: {
    color: '#fff'

  }, 
   myMessage: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    textAlign: 'end',
  },
  otherMessage: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  profilePhoto: {
      width: 50,
      height: 60,
      borderRadius: 10,
      marginRight: 10,
      backgroundColor: 'red'
  },
  inputContainer: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    marginRight: 8,
    padding: 8,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    color: '#fff',
  },
});

const mapStateToProps = (state: RootState) => ({
  user: state.userReducer.user,
  chats: state.chatsReducer.chats
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  createMessage: (payload: ChatMessage)=>dispatch(createNewMessageToChat(payload)),
  removeMatch: (payload: number)=>dispatch(removeMatchAction(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatScreen);
