import React, { useEffect, useState, useCallback } from 'react';
import { View, SafeAreaView, Animated, PanResponder, Text, TouchableOpacity } from 'react-native';
import styles from '../assets/styles/components/MessageView';

type Props = {
  message: string
};

const MessageView = (props: Props) => {  
  return (
    <View style={styles.messageView}>
        <Text style={styles.messageViewText}>
            {props.message}
        </Text>
    </View>
  );
};


export default MessageView