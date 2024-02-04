import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Text, View, TouchableOpacity } from 'react-native';

import TabDisliked from '../components/LikeListItems/TabDisliked';
import TabLikes from '../components/LikeListItems/TabLikes';
import TabUserLikes from '../components/LikeListItems/TabUserLikes';

const Tab = createMaterialTopTabNavigator();

interface LowercaseTabLabelProps {
  route: { name: string };
  style?: any; 
}

const LowercaseTabLabel: React.FC<LowercaseTabLabelProps> = ({ route, style }) => (
  <View style={{ justifyContent: 'center', alignItems: 'center' }}>
    <Text style={[{ color: '#fff' }, style]}>{route.name}</Text>
  </View>
);


interface LowercaseTabLabelProps {
  route: { name: string };
  style?: any; 
}
const AppTabs: React.FC = () => (
  <Tab.Navigator
    initialRouteName="Liked You" 
    tabBar={({ state, descriptors, navigation }) => (
      <View style={{ flexDirection: 'row', padding: 0 }}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <TouchableOpacity
              key={route.key}
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                padding: 10,
                backgroundColor: isFocused ? '#333' : '#222',
              }}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
            >
              <LowercaseTabLabel route={route} style={{ color: isFocused ? '#fff' : '#aaa' }} />
            </TouchableOpacity>
          );
        })}
      </View>
    )}
  >
    <Tab.Screen name="You Disliked" component={TabDisliked} />
    <Tab.Screen name="Liked you" component={TabLikes} />
    <Tab.Screen name="You Liked" component={TabUserLikes} />
  </Tab.Navigator>
);


export default AppTabs;
