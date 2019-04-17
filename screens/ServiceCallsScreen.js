import React, { Component } from 'react';
import { Text, View, ScrollView, ListView, TouchableNativeFeedback } from 'react-native';
import { Icon } from 'react-native-elements';

import { Col, Row, Grid } from 'react-native-easy-grid';
import { withNavigation } from 'react-navigation';
import { commonStyles } from '../styles';

import StorageManager from '../services/storage_manager';
import LoadingCircle from '../components/LoadingCircle';
import Colors from '../constants/Colors';
import urls from '../constants/Urls';
import WSConnector from '../network/WSConnector';

import { getApiRestIdbyEmployee } from '../network/getApiRestIdbyEmployee';
import { getApiServiceCallsByRestId } from '../network/getApiServiceCallsByRestId';
import { deleteApiServiceCall } from '../network/deleteApiServiceCall';

class ServiceCallsScreen extends Component {
  constructor() {
    super();
    this.state = {
      status: 'loading',
      data: [],
      user: null
    };
    this.storageManager = new StorageManager();
    this.newServiceCallSocket = new WSConnector(urls.wsRootUrl, null, urls.wsNewServiceCall);

    this.newServiceCallSocket.listen(this.onNewServiceCallReceived);
    this.handleCall = this.handleCall.bind(this);
  }

  async onNewServiceCallReceived(serviceCall) {
    try {
      let serviceCallParsed = JSON.parse(serviceCall);
      this.setState({ data: { serviceCallParsed, ...this.state.data } });
    } catch (err) {
      console.error(err);
    }
  }

  async componentWillMount() {
    try {
      let user = await this.storageManager._retrieveUserData();
      if (user) {
        await this.setState({
          user: user
        });
        const restaurant = await getApiRestIdbyEmployee(this.state.user.userId);

        if (restaurant) {
          await this.storageManager._storeRestaurantData(restaurant);
          const calls = await getApiServiceCallsByRestId(restaurant.restaurantId);
          this.setState({
            data: calls || [],
            status: 'loaded'
          });
        }
      }
    } catch (err) {
      console.error(err);
      this.setState({
        data: [],
        status: 'failed'
      });
    }
  }

  async handleCall(id) {
    await deleteApiServiceCall(id);
    let calls = [];
    for (call of this.state.data) {
      if (call.callId !== id) calls.push(call);
    }
    this.setState({ data: calls });
  }

  render() {
    return (
      <View style={[ commonStyles.container, { paddingTop: 20 } ]}>
        {this.state.data !== {} && this.state.data.length !== 0 && this.state.status !== 'loading' ? (
          <ScrollView>
            {this.state.data.map(this.renderItem)
            // this.state.data[0]
            }
          </ScrollView>
        ) : (
          <LoadingCircle />
        )}
      </View>
    );
  }

  renderItem = (serviceCall, i) => {
    return serviceCall ? (
      <View
        key={'call_' + serviceCall.callId}
        style={[ commonStyles.container, commonStyles.shadowSmall, { height: 100, marginBottom: 5 } ]}
      >
        <Grid>
          <Row style={commonStyles.rowList}>
            <Col size={6} style={[ commonStyles.columnList, commonStyles.justifyCenter ]}>
              <Text style={commonStyles.textBig}>Service call ID: {serviceCall.callId}</Text>
              <Text style={commonStyles.textSmall}>Time received: {serviceCall.callDate}</Text>
              <Text style={commonStyles.textSmall}>Table ID: {serviceCall.tableId}</Text>
              <Text style={commonStyles.textSmall}>Reason: {serviceCall.reason}</Text>
            </Col>
            <Col size={1} style={[ commonStyles.columnList, commonStyles.justifyCenter ]}>
              <View
                key={'call_btn_' + serviceCall.callId}
                style={[
                  {
                    backgroundColor: Colors.red,
                    width: 60,
                    height: 60,
                    borderRadius: 10
                  },
                  commonStyles.centered,
                  commonStyles.justifyCenter
                ]}
              >
                <TouchableNativeFeedback
                  onPress={() => {
                    this.handleCall(serviceCall.callId);
                  }}
                  style={[
                    {
                      width: 60,
                      height: 60,
                      padding: 10,
                      margin: 0
                    },
                    commonStyles.centered,
                    commonStyles.justifyCenter
                  ]}
                >
                  <Icon name="times" type="font-awesome" size={30} color={Colors.white} />
                </TouchableNativeFeedback>
              </View>
            </Col>
          </Row>
        </Grid>
      </View>
    ) : (
      <View key={'no_call_' + i} />
    );
  };
}

//do we need this?
export default withNavigation(ServiceCallsScreen);
