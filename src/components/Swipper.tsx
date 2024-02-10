import React, { useEffect, useState, useCallback, useDebugValue } from 'react';
import { View, SafeAreaView, Animated, PanResponder, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { retrieveAllAction, nextPersonAction, User } from '../reducers/peopleReducer';
import { RootState } from '../store';
import { LoggedUser } from '../reducers/userReducer';
import * as Api from '../apis/Titser';
import styles from '../assets/styles/components/Swipper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { setLocationAction, Location } from '../reducers/locationReducer';
import { backendIP, backendPort } from '../apis/BackendAdress';

type Props = {
  people: User[];
  user: LoggedUser;
  location: Location | null;
  retrieveAll: (payload: any) => void;
  nextPerson: () => void;
};

const Swipper = (props: Props) => {  
  const [disablePanResponder, setDisablePanResponder] = useState(false);
  const [dislikeButtonColor, setDislikeButtonColor] = useState('#fff');
  const [likeButtonColor, setLikeButtonColor] = useState('#fff');
  const [iconDislikeColor, setDislikeIconColor] = useState('#c00');
  const [iconLikeColor, setLikeIconColor] = useState('#a0f');
  const [pan] = useState(new Animated.ValueXY());

  const fadeAnim = new Animated.Value(1);

  const resetButtons = ()=>{
    setLikeButtonColor('#fff');
    setLikeIconColor('#a0f');
    setDislikeButtonColor('#fff');
    setDislikeIconColor('#c00')
  }
  const setLikeButton = ()=>{
    setLikeIconColor('#fff');
    setLikeButtonColor('#a0f');
  }
  const setDislikeButton = ()=>{
    setDislikeButtonColor('#c00');
    setDislikeIconColor('#fff')
  }

  useEffect(()=>{
    Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500, 
        useNativeDriver: true,
      }).start();
  }, [props.people])

  const likeUser = async ()=>{
    props.nextPerson();
      await Api.like({userIdFrom: props.user.id, userIdTo: props.people[0].id})
      pan.setValue({ x: 0, y: 0 });
  }
  const dislikeUser = async ()=>{
    props.nextPerson();
    await Api.dislike({userIdFrom: props.user.id, userIdTo: props.people[0].id})
    pan.setValue({ x: 0, y: 0 });
  }
  const handleSwipe = useCallback(
    async (gestureState: any) => {
      if (gestureState.dx > 150) {
        fadeAnim.setValue(0);
        setDisablePanResponder(true)
        if (props.people.length > 0) {
          likeUser()
        }
      } else if (gestureState.dx < -150) {
        fadeAnim.setValue(0);
        setDisablePanResponder(true)
        if (props.people.length > 0) {
          dislikeUser()
        } else{
        }
      }
    },
    [props.people, props.nextPerson, pan]
  );

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () =>  !disablePanResponder,
    onPanResponderMove: (e, gestureState) => {
      if(!disablePanResponder){
        Animated.event(
          [null,
            {
              dx: pan.x,
              dy: pan.y,
            },
          ],
          { useNativeDriver: false }
        )(e, gestureState);
  
        console.log(gestureState.dx)
        if (gestureState.dx > 0) {
          resetButtons()
          setLikeButton()
        } else if (gestureState.dx < 0){
          resetButtons()
          setDislikeButton()
        } else{
          resetButtons()
        }
      }
    },
    onPanResponderRelease: (e, gestureState) => {
      handleSwipe(gestureState);
      Animated.spring(pan, { toValue: { x: 0, y: 0 }, useNativeDriver: false }).start();
      setDisablePanResponder(false)

      setLikeButtonColor('#fff');
      setDislikeButtonColor('#fff');
      setLikeIconColor('#a0f')
      setDislikeIconColor('#c00')
    },
  });


  const animatedStyles = {
    transform: [
      { translateX: pan.x.interpolate({ inputRange: [-200, 0, 200], outputRange: [-200, 0, 200] }) },
    ],
  };

  return (
        <>
          <Animated.View style={[styles.card, animatedStyles]} {...panResponder.panHandlers}>
            <Animated.Image
               source={{ uri: `http://${backendIP}:${backendPort}/images/${props.people[0].photo}` }}
              style={[styles.photo, {opacity: fadeAnim} ]} 
              />
          </Animated.View>
          <View style={styles.descriptionContainer}>
            <View style={styles.descriptionTexts}>
                <Text></Text>
              <Text style={styles.personPresentation}>{props.people[0].customName} - {props.people[0].age}</Text>
              <Text style={styles.descriptionText}>{props.people[0].description}</Text>
            </View>
            <View style={styles.actionsContainer}>
              <TouchableOpacity style={[styles.actionButton, { backgroundColor: dislikeButtonColor }]}>
                <Icon name="times" size={25} color={iconDislikeColor} />
              </TouchableOpacity>
              <TouchableOpacity style={[styles.actionButton, { backgroundColor: likeButtonColor }]} onPress={likeUser}>
                <Icon name="heart" size={25} color={iconLikeColor} />
              </TouchableOpacity>
            </View>
          </View>
        </>
  );
};


const mapStateToProps = (state: RootState) => ({
  people: state.peopleReducer.people,
  user: state.userReducer.user,
  location: state.locationReducer.location
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  retrieveAll: (payload: any) => dispatch(retrieveAllAction(payload)),
  nextPerson: () => dispatch(nextPersonAction()),
  setLocation: (payload: Location)=> dispatch(setLocationAction(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(Swipper);