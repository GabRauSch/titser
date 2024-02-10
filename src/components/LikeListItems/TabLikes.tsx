import React, { useEffect, useState } from "react";
import { ScrollView, Image, StyleSheet, Text, View, TouchableOpacity, Touchable, TouchableHighlight } from "react-native";
import { connect } from "react-redux";
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Api from "../../apis/Titser";
import { RootState } from "../../reducers";
import { Dispatch } from "redux";
import { Like, setLikesAction } from "../../reducers/likesReducer";
import { User } from "../../reducers/peopleReducer";
import { backendIP, backendPort } from "../../apis/BackendAdress";
import Swipper from "../Swipper";

type Props = {
  likes: Like[];
  user: User;
  setLikes: (payload: Like[]) => void;
};

const TabLike = (props: Props) => {
  const [maximized, setMaximized] = useState(false);
  
  useEffect(() => {
    const fetchData = async () => {
      const alreadyRetrievedIds = props.likes.map(el=>el.id)
      const data = await Api.getLikes(props.user.id, alreadyRetrievedIds);
      if (data.data) {
        props.setLikes(data.data);
      }
    };

    const intervalId = setInterval(() => {
      fetchData();
    }, 4000);
  
    return () => clearInterval(intervalId);
  }, []);

  const likeUser = async (userId: number)=>{
      await Api.like({userIdFrom: props.user.id, userIdTo: userId})
  }

  const dislikeUser = async (userId: number)=>{
    await Api.dislike({userIdFrom: props.user.id, userIdTo: userId})
  }

  const handleMaximize = () => {
    setMaximized(!maximized);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
    {props.likes?.length > 0 ? (
      props.likes.map((el, key) => (
        <TouchableHighlight style={styles.likeContainerWrapper} key={key} onPress={handleMaximize}>
          <View style={[styles.likeContainer, { height: maximized ? 200 : 100 }]}>
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
              <Icon name="heart" size={35} color="green" />
            </TouchableOpacity>
          </View>
        </TouchableHighlight>
      ))
    ) : (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyContainerText}>none likes you</Text>
      </View>
    )}
  </ScrollView>
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
    minHeight: '100%'
  },

  likeContainerWrapper: {
    borderRadius: 10,
    margin: 10,
    width: 140,
    borderColor:'#a0f',
    borderWidth: .7, 
    justifyContent: 'center'
  },

  likeContainer: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  actionButton: {
    position: 'absolute',
    right: 5,
    top: 2
  },
  dislikeButton: {
    position: 'absolute',
    left: 5,
    top: 2
  },
  emptyContainer: {
    fontSize: 20,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
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

const mapStateToProps = (state: RootState) => ({
  likes: state.likesReducer.likes,
  user: state.userReducer.user
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setLikes: (payload: Like[]) => dispatch(setLikesAction(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TabLike);
