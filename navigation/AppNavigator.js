import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import SignedIn from './SignedIn';
import SignedOut from './SignedOut';

async componentWillMount() {
  let user = await this.storageManager._retrieveUserData();
  await this.setState({
    user: user
  });
}

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
