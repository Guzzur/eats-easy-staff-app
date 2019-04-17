import React from 'react';
import { View } from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';
import SignedInNavigator from './navigation/SignedInNavigator';
import SignedOutNavigator from './navigation/SignedOutNavigator';
import { commonStyles } from './styles';
import StorageManager from './services/storage_manager';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoadingComplete: false,
      user: null
    };
    this.storageManager = new StorageManager();
  }

  async componentWillMount() {
    let DEBUG = true;
    if (DEBUG) {
      // await this.storageManager._removeAllData();
      console.log('_retrieveUserData', await this.storageManager._retrieveUserData());
      console.log('_retrieveRestaurantData', await this.storageManager._retrieveRestaurantData());
      console.log('_retrieveAllOrdersData', await this.storageManager._retrieveAllOrdersData());
      console.log('_retrieveAllOrderStatuses', await this.storageManager._retrieveAllOrderStatuses());
      console.log('_retrieveAllTablesData', await this.storageManager._retrieveAllTablesData());
      console.log('_retrieveTableData', await this.storageManager._retrieveTableData());
      console.log('_retrievePaymentMethodData', await this.storageManager._retrievePaymentMethodData());
    }
    this.setState({ user: await this.storageManager._retrieveUserData() });

    setInterval(async () => {
      let user = await this.storageManager._retrieveUserData();
      this.setState({ user });
    }, 3000);
  }

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <View style={commonStyles.container}>{this.state.user ? <SignedInNavigator /> : <SignedOutNavigator />}</View>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([ require('./assets/images/robot-dev.png'), require('./assets/images/robot-prod.png') ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf')
      })
    ]);
  };

  _handleLoadingError = (error) => {
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}
