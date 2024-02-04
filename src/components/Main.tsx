import React, { useEffect, useState, useCallback } from 'react';
import { View, SafeAreaView, Animated, PanResponder, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { retrieveAllAction, nextPersonAction, User } from '../reducers/peopleReducer';
import { RootState } from '../store';
import { LoggedUser } from '../reducers/userReducer';
import * as Api from '../apis/Titser';
import styles from '../assets/styles/components/Main';
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

const Main = (props: Props) => {  
  const [disablePanResponder, setDisablePanResponder] = useState(false);
  const [dislikeButtonColor, setDislikeButtonColor] = useState('white');
  const [likeButtonColor, setLikeButtonColor] = useState('white');
  const [pan] = useState(new Animated.ValueXY());

  const fadeAnim = new Animated.Value(1);

  useEffect(() => {
    const fetchData = async () => {
      if (props.people.length < 4) {
        if(props.location?.latitude && props.location.longitude){
          const idsRetrieved = props.people.map((el) => el.id);
          const retrieveData = {
            userId: props.user.id,
            ageRange: props.user.targetAgeRange,
            location: {
              latitude: props.location.latitude,
              longitude: props.location.longitude,
            },
            gender: props.user.tagetGender,
            rangeInMeters: props.user.targetDistanceRange,
            idsRetrieved,
          }
          const data = await Api.fullRetrieve(retrieveData);
          
          if(data.data.length > 0){
            props.retrieveAll(data.data);
          }
        }
      }
    };
    fetchData()

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500, 
      useNativeDriver: true,
    }).start();
    
  }, [props.people, props.location]);

  const handleSwipe = useCallback(
    async (gestureState: any) => {
      if (gestureState.dx > 150) {
        setDisablePanResponder(true)
        if (props.people.length > 0) {
          props.nextPerson();
          await Api.like({userIdFrom: props.user.id, userIdTo: props.people[0].id})
          pan.setValue({ x: 0, y: 0 });
        } else{
        }
      } else if (gestureState.dx < -150) {
        setDisablePanResponder(true)
        if (props.people.length > 0) {
          props.nextPerson();
          await Api.dislike({userIdFrom: props.user.id, userIdTo: props.people[0].id})
          pan.setValue({ x: 0, y: 0 });
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
          [
            null,
            {
              dx: pan.x,
              dy: pan.y,
            },
          ],
          { useNativeDriver: false }
        )(e, gestureState);
  
        if (gestureState.dx > 0) {
          setLikeButtonColor('green');
        } else if (gestureState.dx < 0){
          setDislikeButtonColor('red')
        } else{
          setLikeButtonColor('white');
        }
      }
    },
    onPanResponderRelease: (e, gestureState) => {
      handleSwipe(gestureState);
      Animated.spring(pan, { toValue: { x: 0, y: 0 }, useNativeDriver: false }).start();
      setDisablePanResponder(false)

      setLikeButtonColor('white');
      setDislikeButtonColor('white');
      fadeAnim.setValue(0);
    },
  });


  const animatedStyles = {
    transform: [
      { translateX: pan.x.interpolate({ inputRange: [-200, 0, 200], outputRange: [-200, 0, 200] }) },
    ],
  };

  return (
    <SafeAreaView style={styles.container}>
        {props.people.length == 0 ?
          (<View style={styles.messageView}>
            <Text style={styles.messageViewText}>
              No user found with your requirements! Mr mister!
            </Text>
          </View>
          ) : (
            <>
          <Animated.View style={[styles.card, animatedStyles]} {...panResponder.panHandlers}>
            <Animated.Image
               source={{ uri: `http://${backendIP}:${backendPort}/images/${props.people[0].photo}` }}
              style={[styles.photo, {opacity: fadeAnim} ]} 
              />
          </Animated.View>
          <View style={styles.descriptionContainer}>
            <View style={styles.descriptionTexts}>
              <Text style={styles.personPresentation}>{props.people[0].customName} - {props.people[0].age}</Text>
              <Text style={styles.descriptionText}>{props.people[0].description}</Text>
            </View>
            <View style={styles.actionsContainer}>
              <TouchableOpacity style={[styles.actionButton, { backgroundColor: dislikeButtonColor }]}>
                <Icon name="times" size={25} color="#FF6B6B" />
              </TouchableOpacity>
              <TouchableOpacity style={[styles.actionButton, { backgroundColor: likeButtonColor }]}>
                <Icon name="heart" size={25} color="#4CAF50" />
              </TouchableOpacity>
            </View>
          </View>
            </>
        )
      }
    </SafeAreaView>
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

export default connect(mapStateToProps, mapDispatchToProps)(Main);