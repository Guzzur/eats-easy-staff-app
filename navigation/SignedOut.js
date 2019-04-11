import React from 'react';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

// stacks
const SignInStack = createStackNavigator(
  {
    SignUp: SignInScreen
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false
    }
  }
);

// Navigations

OrderStack.navigationOptions = {
  tabBarLabel: 'SignIn',
  tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name={'shopping-cart'} />
};

export default createBottomTabNavigator({
  SignInStack
});
