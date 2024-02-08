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
import Swiper from './Swipper';
import MessageView from './MessageView';

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
            gender: props.user.targetGender,
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
  }, [props.people, props.location]);

  return (
    <SafeAreaView style={styles.container}>
        {props.people.length == 0 
          ? (<MessageView message={"No users with your requirements, Dom Juan"}/>) 
          : ( <Swiper/>)}
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