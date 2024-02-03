import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import LikesListItem from '../components/LikesListItem';
import Header from '../components/Header';

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
      photo: '../assets/images/uus.jpg',
    },{
      id: '2',
      name: 'John Doe',
      age: 28,
      description: 'A software engineer who loves coding.',
      photo: '../assets/images/uus.jpg',
    },{
      id: '3',
      name: 'John Doe',
      age: 28,
      description: 'A software engineer who loves coding.',
      photo: '../assets/images/uus.jpg',
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
        <View style={styles.row}>
          {data.map((item) => (
            <LikesListItem
              key={item.id}
              name={item.name}
              age={item.age}
              description={item.description}
              photo={item.photo}
            />
        ))
      }
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'black',
    color: 'white',
  }, row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
});

export default LikesPage;
