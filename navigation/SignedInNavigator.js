import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import SignedIn from './SignedIn';

export default createAppContainer(
  createSwitchNavigator(
    {
      SignedIn: SignedIn
    },
    {
      initialRouteName: 'SignedIn'
    }
  )
);
