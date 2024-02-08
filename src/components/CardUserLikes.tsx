import React, { useEffect } from "react";
import { ScrollView, Image, StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon5 from 'react-native-vector-icons/FontAwesome5';
import * as Api from "../apis/Titser";
import { RootState } from "../reducers";
import { Dispatch } from "redux";
import { User } from "../reducers/peopleReducer";
import { backendIP, backendPort } from "../apis/BackendAdress";
import { UserLikes, setUserLikesAction } from "../reducers/userLikesReducer";

type Props = {
  id: number
  interactionResponse: string,
  customName: string,
  age: number,
  photo: string
};

const Card = ({id, interactionResponse, customName, age, photo}: Props) => {
  return (
  <View key={id}>
  {interactionResponse && (
    <View style={[styles.likeContainerWrapper, interactionResponse === 'dislike' && { opacity: 0.3 }]}>
      <View style={styles.likeContainer}>
        <Image
          source={{ uri: `http://${backendIP}:${backendPort}/images/${photo}` }}
          style={[
            styles.likeImage,
            (interactionResponse !== 'like' && interactionResponse !== 'dislike') && { opacity: 0.6 },
          ]}
        />
        {interactionResponse && (
          <>
            {interactionResponse === 'like' && <Icon name="comments" size={35} color="#a0f" style={[styles.icon, { opacity: 0.6 }]} />}
            {interactionResponse === 'none' && <Icon name="question-circle" size={35} color="#fff" style={[styles.icon, { opacity: 0.4 }]} />}
            {interactionResponse === 'dislike' && <Icon name="times" size={35} color="#c00" style={styles.icon} />}
            <View style={styles.overlayContainer}>
              <Text style={styles.likeText}>{customName} - {age}</Text>
            </View>
          </>
        )}
      </View>
    </View>
  )}
</View>
  );
};

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#222',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      flexWrap: 'wrap',
      alignItems: 'center',
    },
  
    likeContainerWrapper: {
      borderRadius: 10,
      margin: 10,
      width: 150,
      borderWidth: 0.5,
      justifyContent: 'center'
    },
  
    likeContainer: {
      borderRadius: 10,
      overflow: 'hidden',
    },
  
    emptyContainer: {
      fontSize: 20,
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center'
    },
    emptyContainerText: {
      color: '#fff',
      padding: 10
    },
    likeImage: {
      width: '100%',
      height: 150,
      borderRadius: 10,
    },
  
    icon: {
      position: 'absolute',
      top: 10,
      right: 10,
    },
  
    overlayContainer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      padding: 6,
      justifyContent: 'center',
      flexDirection: 'row',
    },
  
    likeText: {
      fontSize: 16,
      color: '#fff',
      marginBottom: 8,
    },
  });

export default Card
