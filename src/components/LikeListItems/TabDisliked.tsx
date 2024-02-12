import React, { useEffect, useState } from "react";
import { ScrollView, Image, StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Api from "../../apis/Titser";
import { RootState } from "../../reducers";
import { Dispatch } from "redux";
import {Dislike, setDislikesAction} from '../../reducers/dislikesReducer'
import { User } from "../../reducers/peopleReducer";
import { backendIP, backendPort } from "../../apis/BackendAdress";
import { styles } from "../../assets/styles/components/likeListItems/TabDisliked";

type Props = {
  dislikes: Dislike[];
  user: User;
  setDislikes: (payload: Dislike[]) => void;
};

const TabDisliked = (props: Props) => {
  const [dislikes, setDislikes] = useState<Dislike[]>([])
  useEffect(() => {
    const fetchData = async () => {
      const data = await Api.getDislikes(props.user.id, [0]);
      if (data) {
        setDislikes(data.data);
      }
    };
  
    fetchData();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
    {dislikes?.length > 0 ? (
      dislikes.map((el, key) => (
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
            <Text style={styles.emptyContainerText}>You didn't dislike anyone, what a great person!</Text>
        </View>
    )}
  </ScrollView>
  
  );
};
const mapStateToProps = (state: RootState) => ({
    dislikes: state.dislikesReducer.dislikes,
  user: state.userReducer.user
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setDislikes: (payload: Dislike[]) => dispatch(setDislikesAction(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TabDisliked);
