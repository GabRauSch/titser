import React, { useEffect } from "react";
import { ScrollView, Image, StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";
import Icon from 'react-native-vector-icons/FontAwesome';
import { backendIP, backendPort } from "../../apis/BackendAdress";
import { styles } from "../../assets/styles/components/likeListItems/CardUserLikes";

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

export default Card
