import React, { useEffect } from "react";
import { ScrollView, Image, StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon5 from 'react-native-vector-icons/FontAwesome5';
import * as Api from "../../apis/Titser";
import { RootState } from "../../reducers";
import { Dispatch } from "redux";
import { Like, setLikesAction } from "../../reducers/likesReducer";
import { User } from "../../reducers/peopleReducer";
import { backendIP, backendPort } from "../../apis/BackendAdress";
import { UserLikes, setUserLikesAction } from "../../reducers/userLikesReducer";

type Props = {
  userLikes: UserLikes[];
  user: User;
  setUserLikes: (payload: UserLikes[]) => void;
};

const TabUserLike = (props: Props) => {
  useEffect(() => {
    const fetchData = async () => {
      const data = await Api.getUserLikes(props.user.id);
      if (data) {
        console.log('o')
        props.setUserLikes(data.data);
      }
    };
    fetchData();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
    {props.userLikes?.length > 0 ? (
      props.userLikes.map((el, key) => (
        <View key={key}>
            {el.interactionResponse == 'like' 
                ? (
                    <View style={styles.likeContainerWrapper}>
                        <View style={styles.likeContainer}>
                            <Image
                            source={{ uri: `http://${backendIP}:${backendPort}/images/${el.photo}` }}
                            style={styles.likeImage}
                            />
                            {el.interactionResponse == 'like' 
                                ? (
                                <>
                                    <Icon name="comments" size={35} color="#c0c" style={[styles.icon, {opacity: .6}]} />
                                    <View style={styles.overlayContainer}>
                                        <Text style={styles.likeText}>{el.customName} - </Text>
                                        <Text style={styles.likeText}>{el.age}</Text>
                                    </View>
                                </>
                                ) : (<></>)}
                        </View>
                    </View>
                ) : null
            }
  
            {el.interactionResponse == 'dislike' 
                ? (
                    <View style={[styles.likeContainerWrapper,  {opacity: .3}]}>
                    <View style={styles.likeContainer}>
                        <Image
                        source={{ uri: `http://${backendIP}:${backendPort}/images/${el.photo}` }}
                        style={styles.likeImage}
                        />
                        {el.interactionResponse == 'dislike'
                            ? (
                            <>
                                <Icon name="times" size={35} color="#c00" style={styles.icon} />
                                <View style={styles.overlayContainer}>
                                    <Text style={styles.likeText}>{el.customName} - </Text>
                                    <Text style={styles.likeText}>{el.age}</Text>
                                </View>
                            </>
                            ) : (<></>)}
                    </View>
                    </View>
                ) : null
            }

            {el.interactionResponse == 'none' 
                ? (
                    <View style={styles.likeContainerWrapper}>
                        <View style={styles.likeContainer}>
                            <Image
                            source={{ uri: `http://${backendIP}:${backendPort}/images/${el.photo}` }}
                            style={[styles.likeImage, {opacity: 0.6}]}
                            />
                            {el.interactionResponse == 'none'
                                ? (
                                <>
                                <Icon name="question-circle" size={35} color="#fff" style={[styles.icon, {opacity: 0.4}]} />
                                <View style={styles.overlayContainer}>
                                    <Text style={styles.likeText}>{el.customName} - </Text>
                                    <Text style={styles.likeText}>{el.age}</Text>
                                </View>
                                </>
                                ) : (<></>)}
                        </View>
                    </View>
                ) : null
            }
        </View>
      ))
    )
  : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyContainerText}>You didn't like anyone cause you are always the center of attentions!! You know what? when your mother said she should've thought more seriously about having you, she meant YOU! if it was a more enjoyable person she must probably would love them!</Text>
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
  },

  likeContainerWrapper: {
    borderRadius: 10,
    margin: 10,
    width: 140,
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

const mapStateToProps = (state: RootState) => ({
  userLikes: state.userLikesReducer.userLikes,
  user: state.userReducer.user
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setUserLikes: (payload: UserLikes[]) => dispatch(setUserLikesAction(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TabUserLike);
