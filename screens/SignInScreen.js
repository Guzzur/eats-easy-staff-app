import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';
import SignInDialog from '../components/SignInDialog';
import SignUpDialog from '../components/SignUpDialog';
import StorageManager from '../services/storage_manager';
import { commonStyles } from '../styles';
import Colors from '../constants/Colors';

export default class SignInScreen extends React.Component {
  constructor() {
    super();

    this.state = {
      user: null,
      signInVisible: false,
      signUpVisible: false,
      mounted: true
    };
    this.storageManager = new StorageManager();
  }

  componentWillUnmount() {
    this.setState({ mounted: false });
  }

  render() {
    return (
      <View style={[ commonStyles.container, commonStyles.centered, commonStyles.justifyCenter ]}>
        {
          <Button
            title={'Sign in'.toUpperCase()}
            onPress={() => {
              if (this.state.mounted) this.setState({ signInVisible: true });
            }}
            icon={{
              name: 'sign-in',
              type: 'font-awesome',
              size: 20,
              color: Colors.white
            }}
            rounded
            backgroundColor={Colors.tintColor}
          />
        }
        <SignInDialog
          visible={this.state.signInVisible}
          cancel={async () => {
            let user = await this.storageManager._retrieveUserData();
            if (this.state.mounted) this.setState({ signInVisible: false, user });
          }}
          signUpActionHandler={() => {
            if (this.state.mounted) this.setState({ signInVisible: false, signUpVisible: true });
          }}
        />
        <SignUpDialog visible={this.state.signUpVisible} cancel={() => this.setState({ signUpVisible: false })} />
      </View>
    );
  }
}
