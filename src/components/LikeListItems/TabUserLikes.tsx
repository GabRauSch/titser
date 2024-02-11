  import React, { useEffect, useState } from "react";
  import { ScrollView, Image, StyleSheet, Text, View } from "react-native";
  import { connect } from "react-redux";
  import * as Api from "../../apis/Titser";
  import { RootState } from "../../reducers";
  import { Dispatch } from "redux";
  import { User } from "../../reducers/peopleReducer";
  import { UserLikes, setUserLikesAction } from "../../reducers/userLikesReducer";
  import Card from '../CardUserLikes'

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

  const styles = StyleSheet.create({
    container: {
      height: '100%'
    },
    scroll: {
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
      minHeight: '100%',
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
