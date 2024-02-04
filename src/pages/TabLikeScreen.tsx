import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import Header from '../components/Header';
import LikesListItem from '../components/LikeListItems/LikesListItem';

interface Person {
  id: string;
  name: string;
  age: number;
  description: string;
  photo: string;
}

const LikesPage: React.FC = () => {
  const data: Person[] = [
    {
      id: '1',
      name: 'John Doe',
      age: 28,
      description: 'A software engineer who loves coding.',
      photo: '../../assets/images/uus.jpg',
    },{
      id: '2',
      name: 'John Doe',
      age: 28,
      description: 'A software engineer who loves coding.',
      photo: '../../assets/images/uus.jpg',

    },{
      id: '3',
      name: 'John Doe',
      age: 28,
      description: 'A software engineer who loves coding.',
      photo: '../../assets/images/uus.jpg',

    },
    // Add more dummy data items
  ];

  // const renderItems = () => { 
  //   return 
  //   };

  return (
    <>
      <Header />
      <View style={styles.container}>
          <LikesListItem></LikesListItem>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    color: 'white',
  }, row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
});

export default LikesPage;
