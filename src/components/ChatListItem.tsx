import React from 'react';
import { View, Text, Image, StyleSheet, ImageSourcePropType } from 'react-native';
import styles from '../assets/styles/components/ChatListItem';

type Props = {
    name: string,
    lastMessage: string,
    photo: string,
    read: boolean
}

const LikesListItem = ({ name, lastMessage, photo, read }: Props) => {
    const photoSource = require('../assets/images/uus.jpg');
    return (
        <View style={styles.container}>
            <Image source={photoSource} style={styles.photo} />
            <View style={styles.infoContainer}>
                <Text style={styles.name}>{name}</Text>
                <Text 
                    style={[styles.message, {
                        color: read ? '#999' : 'white'
                    }]}
                >{lastMessage}</Text>
            </View>
            <View style={read ? null : styles.readButton}>

            </View>
        </View>
    );
};


export default LikesListItem;
