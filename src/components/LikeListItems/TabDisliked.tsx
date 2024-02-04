import React, { useEffect } from "react";
import { ScrollView, Image, StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Api from "../../apis/Titser";
import { RootState } from "../../reducers";
import { Dispatch } from "redux";
import {Dislike, setDislikesAction} from '../../reducers/dislikesReducer'
import { User } from "../../reducers/peopleReducer";
import { backendIP, backendPort } from "../../apis/BackendAdress";

type Props = {
  dislikes: Dislike[];
  user: User;
  setDislikes: (payload: Dislike[]) => void;
};

const TabDisliked = (props: Props) => {
  useEffect(() => {
    const fetchData = async () => {
      const data = await Api.getDislikes(props.user.id);
      if (data) {
        props.setDislikes(data.data);
      }
    };
    fetchData();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
    {props.dislikes?.length > 0 ? (
      props.dislikes.map((el, key) => (
        <View style={styles.likeContainerWrapper} key={key}>
          <View style={styles.likeContainer}>
            <Image
              source={{ uri: `http://${backendIP}:${backendPort}/images/${el.photo}` }}
              style={styles.likeImage}
            />
            <Icon name="heart" size={25} color="#c00" style={styles.icon} />
            <View style={styles.overlayContainer}>
              <Text style={styles.likeText}>{el.customName} - </Text>
              <Text style={styles.likeText}>{el.age}</Text>
            </View>
          </View>
        </View>
      ))
    ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyContainerText}>You didn't dislike anyone, what a great peerson!</Text>
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
    borderColor: 'red',
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
    color: '#fff'
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
    dislikes: state.dislikesReducer.dislikes,
  user: state.userReducer.user
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setDislikes: (payload: Dislike[]) => dispatch(setDislikesAction(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TabDisliked);
