import React from 'react';
import { connect } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import { RootState } from './reducers';
import AppTabs from './navigators/AppTabs';
import Register from './pages/auth/RegisterPage';
import Login from './pages/auth/LoginPage';
import ConfirmationCode from './pages/auth/ConfirmationCode';
import Location from './helpers/location';
import RegisterCompletation from './pages/auth/RegisterCompletation';

interface AppProps {
  isLoggedIn: boolean;
}

const Stack = createStackNavigator();

const MainApp = ({ isLoggedIn }: AppProps) => {
  return (
    <Stack.Navigator>
      {isLoggedIn ? (
       <Stack.Screen
          name="AppTabs"
          component={AppTabs} 
          options={{ headerShown: false }}
        />
      ) : (
        <>
          <Stack.Screen
            name="Register"
            component={Register}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ConfirmationCode"
            component={ConfirmationCode}
            options={{ headerShown: false }}
          />
            <Stack.Screen 
              name="RegisterCompletation"
              component={RegisterCompletation}
              options={{headerShown: false}}
            />
        </>
      )}
    </Stack.Navigator>
  );
};

const mapStateToProps = (state: RootState) => ({
  isLoggedIn: state.userReducer.user.id !== 0,
});

export default connect(mapStateToProps)(MainApp);
