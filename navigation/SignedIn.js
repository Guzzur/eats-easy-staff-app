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

const ManagementStack = createStackNavigator(
  {
    Management: ManagementScreen
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

MenuStack.navigationOptions = {
  tabBarLabel: 'Management',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={'restaurant'} />
  )
};


export default createBottomTabNavigator({
  OrdersStack,
  ServiceCallsStack,
  ManagementStack
});
