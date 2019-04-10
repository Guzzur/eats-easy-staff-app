import React from 'react';
import {
  createStackNavigator,
  createBottomTabNavigator
} from 'react-navigation';

import OrdersScreen from '../screens/OrdersScreen';

//**************
//import screens
//**************

// Stacks
const ServiceCallsStack = createStackNavigator(
  {
    ServiceCalls: ServiceCallsScreen
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false
    }
  }
);

const OrdersStack = createStackNavigator(
  {
    Orders: OrdersScreen
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false
    }
  }
);

const RestaurantMenuStack = createStackNavigator(
  {
    RestaurantMenu: RestaurantMenuScreen
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false
    }
  }
);

const UserProfileStack = createStackNavigator(
  {
    Profile: UserProfileScreen
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
  tabBarLabel: 'Orders',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={'shopping-cart'} />
  )
};

CallServiceStack.navigationOptions = {
  tabBarLabel: 'ServiceCalls',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={'room-service'} />
  )
};

RestaurantMenuStack.navigationOptions = {
  tabBarLabel: 'RestaurantMenu',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={'restaurant'} />
  )
};

UserProfileStack.navigationOptions = {
  tabBarLabel: 'Profile',
  tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name={'user'} />
};


export default createBottomTabNavigator({
  OrdersStack,
  ServiceCallsStack,
  RestaurantMenuStack,
  UserProfileStack
});
