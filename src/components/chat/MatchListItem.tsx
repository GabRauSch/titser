import React from 'react';
import { View, Text, Image, StyleSheet, ImageSourcePropType, TouchableOpacity } from 'react-native';
import styles from '../../assets/styles/components/chat/MatchListItem';
import { NavigationAction, useNavigation } from '@react-navigation/native';
import { backendIP, backendPort } from '../../apis/BackendAdress';


type Props = {
    name: string,
    photo: string,
    navigation: any,
    userIdTo: number,
    id: number,
}

const MatchListItem = (props: Props) => {
    const openChat = () => {
        props.navigation.navigate('ChatScreen', {
            otherUserId: props.userIdTo,
            photo: props.photo,
            userName: props.name,
            room: 'custom'
        })

      };
    return (
        <TouchableOpacity onPress={openChat}>
            <View style={styles.container} >
                <Image source={{uri: `http://${backendIP}:${backendPort}/images/${props.photo}`}} style={styles.photo} />
                <View style={styles.infoContainer}>
                    <Text style={styles.name}>
                        {props.name}{props.userIdTo}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};


export default MatchListItem;
