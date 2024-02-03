import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import * as location from 'expo-location'
import { connect } from 'react-redux';
import { nextPersonAction, retrieveAllAction } from '../reducers/peopleReducer';
import {Location, setLocationAction } from '../reducers/locationReducer';
import { Dispatch } from 'redux';
import { RootState } from '../reducers';

interface Props {
  location: Location | null,
  setLocation: (payload: any) => void
} 

const LocationScreen = (props: Props) => {
  useEffect(()=>{
    const getPerission = async ()=>{
      let { status } = await location.requestForegroundPermissionsAsync();
      if(status !== 'granted'){
        console.log('You need to grant permission')
        return;
      } 
      let currentLocation = await location.getCurrentPositionAsync({});
      const userLocation = {
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude
      }
      props.setLocation(userLocation);
    }
    getPerission()
  }, [])
  return (
    <></>
  );
};

const mapStateToProps = (state: RootState) => ({
  location: state.locationReducer.location
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setLocation: (payload: Location)=> dispatch(setLocationAction(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(LocationScreen);