import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import SignedIn from './SignedIn';
import SignedOut from './SignedOut';
import StorageManager from '../services/storage_manager';

// async componentWillMount() {
let storageManager = new StorageManager();
let user = storageManager._retrieveUserData();
// }

export default createAppContainer(
  createSwitchNavigator(
    {
      SignedIn: SignedIn,
      SignedOut: SignedOut
    },
    {
      initialRouteName: user ? 'SignedIn' : 'SignedOut'
    }
  )
);
