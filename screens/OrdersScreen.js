import React, { Component } from 'react';
import { Text, View, ScrollView, TouchableNativeFeedback } from 'react-native';
import { Icon } from 'react-native-elements';

import { Col, Row, Grid } from 'react-native-easy-grid';
import { withNavigation } from 'react-navigation';
import { commonStyles } from '../styles';

import StorageManager from '../services/storage_manager';
import LoadingCircle from '../components/LoadingCircle';
import Colors from '../constants/Colors';

import { getApiRestIdbyEmployee } from '../network/getApiRestIdbyEmployee';
import { getApiAllOrdersOfRestId } from '../network/getApiAllOrdersOfRestId';

class OrdersScreen extends Component {
  constructor() {
    super();
    this.state = {
      status: 'loading',
      data: [],
      user: null
    };
    this.storageManager = new StorageManager();
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
          const orders = await getApiAllOrdersOfRestId(restaurant.restaurantId);
          this.setState({
            data: orders || [],
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

  render() {
    return (
      <View style={[ commonStyles.container, { paddingTop: 20 } ]}>
        {this.state.data !== {} && this.state.status !== 'loading' ? (
          <ScrollView style={[ commonStyles.container, commonStyles.paddingNone ]}>
            {this.state.data.map(this.renderItem)}
          </ScrollView>
        ) : (
          <LoadingCircle />
        )}
      </View>
    );
  }

  renderItem = (order, i) => {
    return order ? (
      <View
        key={'order_' + i}
        style={[ commonStyles.container, commonStyles.shadowSmall, { height: 100, marginBottom: 5 } ]}
      >
        <Row style={commonStyles.row}>
          <Grid>
            <Row style={commonStyles.rowList}>
              <Col size={6} style={[ commonStyles.columnList, commonStyles.justifyCenter ]}>
                <Text style={commonStyles.textMedium}>Order ID: {order.orderId}</Text>
                <Text style={commonStyles.textSmall}>Table ID: {order.tableId}</Text>
                <Text style={commonStyles.textSmall}>Order Status: {order.orderStatus}</Text>
              </Col>
              <Col size={1} style={[ commonStyles.columnList, commonStyles.justifyCenter ]}>
                <View
                  style={[
                    {
                      backgroundColor: Colors.tintColor,
                      width: 60,
                      height: 60,
                      borderRadius: 10
                    },
                    commonStyles.centered,
                    commonStyles.justifyCenter
                  ]}
                >
                  <TouchableNativeFeedback
                    onPress={async () => {
                      // update orderstatus through network, then re-render
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
                    <Icon name="bell" type="font-awesome" size={30} color={Colors.white} />
                  </TouchableNativeFeedback>
                </View>
              </Col>
            </Row>
          </Grid>
        </Row>
      </View>
    ) : (
      <View key={'no_order_' + i} />
    );
  };
}

//do we need this?
export default withNavigation(OrdersScreen);
