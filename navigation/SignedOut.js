import React from 'react';
import {
  createStackNavigator,
  createBottomTabNavigator
} from 'react-navigation';


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

    const SignUpStack = createStackNavigator(
    {
       SignUp: SignUpScreen
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
    tabBarIcon: ({ focused }) => (
      <TabBarIcon focused={focused} name={'shopping-cart'} />
    )
  };
  
  CallServiceStack.navigationOptions = {
    tabBarLabel: 'SignUp',
    tabBarIcon: ({ focused }) => (
      <TabBarIcon focused={focused} name={'room-service'} />
    )
  };

  export default createBottomTabNavigator({
    SignedInStack,
    SignUpStack
  });
  