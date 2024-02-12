import React, { useEffect, useState } from "react";
import { ScrollView, Image, StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";
import * as Api from "../../apis/Titser";
import { RootState } from "../../reducers";
import { Dispatch } from "redux";
import { User } from "../../reducers/peopleReducer";
import { UserLikes, setUserLikesAction } from "../../reducers/userLikesReducer";
import Card from './CardUserLikes'
import { styles } from "../../assets/styles/components/likeListItems/TabUserLikes";

type Props = {
  userLikes: UserLikes[];
  user: User;
  setUserLikes: (payload: UserLikes[]) => void;
};

const TabUserLike = (props: Props) => {
  const [userLikes, setUserLikes] = useState<UserLikes[]>([])
  useEffect(()=>{
    const fetchData = async () => {
      const data = await Api.getUserLikes(props.user.id, [0]);
      if (data.data) {
        setUserLikes(data.data)
      }
    };
    
    fetchData();

  }, [])
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
      {userLikes?.length > 0 ? (
        userLikes.map((el, key) => (
            <Card key={key} customName={el.customName} age={el.age} photo={el.photo} interactionResponse={el.interactionResponse} id={el.id} />
        ))
      )
    : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyContainerText}>You didn't like anyone cause you are always the center of attentions!! 
              You know what? when your mother said she should really have thought about giving you birth, she meant YOU! 
              if it was a more enjoyable person she must probably would love them!</Text>
          </View>
      )}
      </ScrollView>
    </View>
  );
};


  const mapStateToProps = (state: RootState) => ({
    userLikes: state.userLikesReducer.userLikes,
    user: state.userReducer.user
  });

  const mapDispatchToProps = (dispatch: Dispatch) => ({
    setUserLikes: (payload: UserLikes[]) => dispatch(setUserLikesAction(payload)),
  });

  export default connect(mapStateToProps, mapDispatchToProps)(TabUserLike);
