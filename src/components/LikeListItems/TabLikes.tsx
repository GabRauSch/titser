import React, { useEffect, useState } from "react";
import { ScrollView, Image, StyleSheet, Text, View, TouchableOpacity, TouchableHighlight, Modal } from "react-native";
import { connect } from "react-redux";
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Api from "../../apis/Titser";
import { RootState } from "../../reducers";
import { Dispatch } from "redux";
import { Like, setLikesAction } from "../../reducers/likesReducer";
import { User } from "../../reducers/peopleReducer";
import { backendIP, backendPort } from "../../apis/BackendAdress";
import { styles } from "../../assets/styles/components/likeListItems/TabLikes";


type Props = {
  likes: Like[];
  user: User;
  setLikes: (payload: Like[]) => void;
};

const TabLike = (props: Props) => {
  const [maximized, setMaximized] = useState(false);
  const [selectedLike, setSelectedLike] = useState<Like | null>(null);
  const [likes, setLikes] = useState<Like[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const data = await Api.getLikes(props.user.id, [0]);
      if (data.data) {
        setLikes(data.data);
      }
    };

    fetchData();
  }, []);

  const likeUser = async (userId: number)=>{
      await Api.like({userIdFrom: props.user.id, userIdTo: userId})
  }

  const dislikeUser = async (userId: number)=>{
    await Api.dislike({userIdFrom: props.user.id, userIdTo: userId})
  }

  const handleMaximize = (like: Like) => {
    setSelectedLike(like);
    setMaximized(true);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {likes?.length > 0 ? (
        likes.map((el, key) => (
          <TouchableHighlight style={styles.likeContainerWrapper} key={key} onPress={() => handleMaximize(el)}>
            <View style={[styles.likeContainer]}>
              <Image
                source={{ uri: `http://${backendIP}:${backendPort}/images/${el.photo}` }}
                style={styles.likeImage}
              />
              <TouchableOpacity style={[styles.dislikeButton]} onPress={() => { likeUser(el.id) }}>
                <Icon name="times" size={35} color="red" />
              </TouchableOpacity>
              <View style={styles.overlayContainer}>
                <Text style={styles.likeText}>{el.customName} - </Text>
                <Text style={styles.likeText}>{el.age}</Text>
              </View>

              <TouchableOpacity style={[styles.actionButton]} onPress={() => { likeUser(el.id) }}>
                <Icon name="heart" size={35} color="#b1c" />
              </TouchableOpacity>
            </View>
          </TouchableHighlight>
        ))
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyContainerText}>none likes you</Text>
        </View>
      )}

      {selectedLike &&
        <Modal visible={maximized} transparent={true} animationType="slide">
          <TouchableHighlight style={styles.modalContainer} onPress={()=>{setMaximized(false)}}>
            <View style={styles.modalContent}>
              <View>
                <Image
                  source={{ uri: `http://${backendIP}:${backendPort}/images/${selectedLike?.photo}` }}
                  style={styles.modalImage}
                />
              </View>
              <TouchableOpacity style={styles.dislikeButton} onPress={() =>{dislikeUser(selectedLike.id), setMaximized(false)}}>
                <Icon name="times" size={35} color="red" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton} onPress={() => {likeUser(selectedLike.id), setMaximized(false)}}>
                <Icon name="heart" size={35} color="#b1c" />
              </TouchableOpacity>
              <View style={styles.overlayContainer}>
                <View>
                  <Text style={[styles.likeText, {fontSize: 20}]}>{selectedLike?.customName} - </Text>
                  <Text style={[styles.likeText, {fontSize: 12}]}>{selectedLike?.description}</Text>
                </View>
                  <Text style={[styles.likeText, {fontSize: 20}]}>{selectedLike?.age} years old</Text>
              </View>
            </View>
          </TouchableHighlight>
        </Modal>
      }
    </ScrollView>
  );
};
const mapStateToProps = (state: RootState) => ({
  likes: state.likesReducer.likes,
  user: state.userReducer.user
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setLikes: (payload: Like[]) => dispatch(setLikesAction(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TabLike);
