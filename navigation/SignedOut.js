import React from 'react';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import TabBarIcon from '../components/TabBarIcon';
import SignInScreen from '../screens/SignInScreen';

// stacks
const SignInStack = createStackNavigator(
  {
    SignIn: SignInScreen
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false
    }
  }
);

// Navigations

SignInStack.navigationOptions = {
  tabBarLabel: 'Eats Easy Staff',
  tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name={'leaf'} />
};

export default createBottomTabNavigator({
  SignInStack
});
