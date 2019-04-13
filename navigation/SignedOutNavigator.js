import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import SignedOut from './SignedOut';

export default createAppContainer(
  createSwitchNavigator(
    {
      SignedOut: SignedOut
    },
    {
      initialRouteName: 'SignedOut'
    }
  )
);
