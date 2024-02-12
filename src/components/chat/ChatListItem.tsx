import React from 'react';
import { View, Text, Image, StyleSheet, ImageSourcePropType, TouchableOpacity } from 'react-native';
import styles from '../../assets/styles/components/ChatListItem';
import { NavigationAction, useNavigation } from '@react-navigation/native';
import { backendIP, backendPort } from '../../apis/BackendAdress';
import * as Api from '../../apis/Titser'
import { RootState } from '../../reducers';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { LoggedUser } from '../../reducers/userReducer';
import { readMessagesAction } from '../../reducers/chatsReducer';

type Props = {
    name: string,
    lastMessage: string,
    photo: string,
    read: boolean,
    navigation: any,
    otherUserId: number,
    direction: string,
    user: LoggedUser,
    readMessages: (payload: number)=>void
}

const ChatListItem = (props: Props) => {
    const readMessages = async ()=>{
        console.log('reading')
        const data = await Api.readMessages(props.otherUserId, props.user.id)
        props.readMessages(props.otherUserId)
    }
    const openChat = () => {
        props.navigation.navigate('ChatScreen', {
            otherUserId: props.otherUserId,
            photo: props.photo,
            userName: props.name,
            room: 'custom'
        })    
        readMessages()
      }
    return (
        <TouchableOpacity onPress={openChat}>
            <View style={[styles.container, { borderColor: props.direction === 'received' ? (props.read ? '#ddd' : 'gold') : '#ddd' }]} >
                <Image source={{uri: `http://${backendIP}:${backendPort}/images/${props.photo}`}} style={styles.photo} />
                <View style={styles.infoContainer}>
                <Text style={[styles.name, { color: props.direction === 'received' ? (props.read ? '#ddd' : 'gold') : '#ddd' }]}>
                    {props.name}
                </Text>
                <Text style={[styles.message, { color: props.direction === 'received' ? (props.read ? '#ddd' : 'gold') : '#ddd' }]}>
                    {props.direction === 'sent' ? (props.read ? 'seen: ' : 'sent: ') : '' }
                    {props.lastMessage.length > 32 ? `${props.lastMessage.substring(0, 33)}...` : props.lastMessage}
                </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const mapStateToProps = (state: RootState) => ({
    user: state.userReducer.user,
  });
  
  const mapDispatchToProps = (dispatch: Dispatch) => ({
    readMessages: (payload: number)=>(dispatch(readMessagesAction(payload)))
  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(ChatListItem);