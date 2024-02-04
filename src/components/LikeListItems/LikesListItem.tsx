import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import LikesTab from '../../navigators/LikesTab'

const LikesListItem = () => {

  return (
    <NavigationContainer independent={true}>
      <LikesTab></LikesTab>
    </NavigationContainer>
  );
};

export default LikesListItem;
