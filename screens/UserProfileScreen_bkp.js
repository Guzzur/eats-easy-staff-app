import React from 'react';
import { Text, View } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { Col, Row, Grid } from 'react-native-easy-grid';
import StorageManager from '../services/storage_manager';
import { commonStyles } from '../styles';
import Colors from '../constants/Colors';

export default class UserProfileScreen extends React.Component {
  constructor() {
    super();

    this.state = {
      user: null
    };

    this.storageManager = new StorageManager();
  }
  async componentWillMount() {
    let user = await this.storageManager._retrieveUserData();
    await this.setState({
      user: user
    });
  }

  render() {
    return (
      <View style={[ commonStyles.container, commonStyles.centered, commonStyles.justifyCenter ]}>
        //logged in
        <Grid>
          <Row style={[ commonStyles.container, commonStyles.centered, commonStyles.justifyCenter ]}>
            <Text style={[ commonStyles.textBig, commonStyles.textCenter, commonStyles.textStrong ]}>
              {'Logged in, user ID: ' + this.state.user.userId}
            </Text>
          </Row>
          <Row style={[ commonStyles.container, commonStyles.centered, commonStyles.justifyCenter ]}>
            <Button
              title={'Sign out'.toUpperCase()}
              onPress={() => {
                this.storageManager._removeUserData({ userId: this.state.user.userId }), this.setState({ user: null });
                this.props.navigation.navigate({
                  routeName: 'SignedOut',
                  action: this.props.navigation.navigate({
                    routeName: 'SignInStack'
                    //no params?
                  })
                });
              }}
              icon={{
                name: 'sign-out',
                type: 'font-awesome',
                size: 20,
                color: Colors.white
              }}
              rounded
              backgroundColor={Colors.tintColor}
            />
          </Row>
        </Grid>
      </View>
    );
  }
}
