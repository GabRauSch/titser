// LikesListItem.tsx
import React from 'react';
import { View, Text, Image, StyleSheet, ImageSourcePropType } from 'react-native';

interface LikesListItemProps {
  name: string;
  age: number;
  description: string;
  photo: string;
}

const LikesListItem: React.FC<LikesListItemProps> = ({ name, age, description, photo }) => {
  const photoSource = require('../assets/images/uus.jpg');

  return (
    <View style={styles.container}>
      <View style={styles.itemContainer}>
        <Image source={photoSource} style={styles.photo} />
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.age}>{age} years old</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    width: 300,
    marginTop: 10,
    borderRadius: 10,
    backgroundColor: '#000',
    elevation: 3, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  photo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  age: {
    color: '#555',
  },
  description: {
    marginTop: 5,
    color: '#777',
  },
});

export default LikesListItem;
