import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import Header from '../components/Header';
import LikesListItem from '../components/LikeListItems/LikesListItem';
import { styles } from '../assets/styles/pages/TabLikeScreen';

const LikesPage: React.FC = () => {
  return (
    <>
      <Header />
      <View style={styles.container}>
          <LikesListItem></LikesListItem>
      </View>
    </>
  );
};


export default LikesPage;
