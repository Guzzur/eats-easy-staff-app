import React from 'react';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import ServiceCallsScreen from '../screens/ServiceCallsScreen';
// import RestaurantMenuScreen from '../screens/RestauranMenuScreen';
import UserProfileScreen from '../screens/UserProfileScreen';
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

// const RestaurantMenuStack = createStackNavigator(
//   {
//     RestaurantMenu: RestaurantMenuScreen
//   },
//   {
//     headerMode: 'none',
//     navigationOptions: {
//       headerVisible: false
//     }
//   }
// );

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

OrdersStack.navigationOptions = {
  tabBarLabel: 'Orders',
  tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name={'shopping-cart'} />
};

ServiceCallsStack.navigationOptions = {
  tabBarLabel: 'Service calls',
  tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name={'question'} />
};

// RestaurantMenuStack.navigationOptions = {
//   tabBarLabel: 'RestaurantMenu',
//   tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name={'restaurant'} />
// };

UserProfileStack.navigationOptions = {
  tabBarLabel: 'Profile',
  tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name={'user'} />
};

export default createBottomTabNavigator({
  OrdersStack,
  ServiceCallsStack,
  // RestaurantMenuStack,
  UserProfileStack
});
