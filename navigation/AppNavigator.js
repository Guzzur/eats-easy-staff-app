import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import SignedIn from './SignedIn';
import SignedOut from './SignedOut';



export default createAppContainer(
  createSwitchNavigator(
    {
      SignedIn: SignedIn,
      SignedOut: SignedOut
    },
    {
      initialRouteName: this.user ? "SignedIn" : "SignedOut"
    }
  )
);
