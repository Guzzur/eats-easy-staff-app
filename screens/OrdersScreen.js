import React, { Component } from 'react';
import { Text, View, ScrollView, TouchableNativeFeedback } from 'react-native';
import { Icon } from 'react-native-elements';

import { Col, Row, Grid } from 'react-native-easy-grid';
import { withNavigation } from 'react-navigation';
import { commonStyles } from '../styles';

import StorageManager from '../services/storage_manager';
import LoadingCircle from '../components/LoadingCircle';
import { Snackbar } from 'react-native-material-ui';
import Colors from '../constants/Colors';
// import StompWsConnector from '../network/StompWsConnector';

import { getApiRestIdbyEmployee } from '../network/getApiRestIdbyEmployee';
import { getApiAllOrdersOfRestId } from '../network/getApiAllOrdersOfRestId';
// import { getApiOrderByOrderId } from '../network/getApiOrderByOrderId';
import { putApiOrder } from '../network/putApiOrder';

class OrdersScreen extends Component {
  constructor() {
    super();
    this.state = {
      status: 'loading',
      data: [],
      restaurant: null,
      user: null,
      snackVisible: false
    };
    this.storageManager = new StorageManager();
    // this.onStompWsMessage = this.onStompWsMessage.bind(this);
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
          let orders = await getApiAllOrdersOfRestId(restaurant.restaurantId);
          let sortedOrders =
            orders &&
            orders.length &&
            (await orders.sort((a, b) => (a.orderId > b.orderId ? -1 : b.orderId > a.orderId ? 1 : 0)));
          this.setState({
            data: sortedOrders || [],
            status: 'loaded',
            restaurant: restaurant
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

  componentDidMount() {
    this.setState({
      intervalId: setInterval(async () => {
        let orders = await getApiAllOrdersOfRestId(this.state.restaurant.restaurantId);
        let sortedOrders =
          orders &&
          orders.length &&
          (await orders.sort((a, b) => (a.orderId > b.orderId ? -1 : b.orderId > a.orderId ? 1 : 0)));
        if (sortedOrders.length !== this.state.data.length) {
          console.log('Got new order!');
          this.setState({ snackVisible: true, data: sortedOrders || [] });
          setTimeout(() => {
            this.setState({ snackVisible: false });
          }, 1000);
        }
      }, 10000)
    });
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  render() {
    return (
      <View style={[ commonStyles.container, { paddingTop: 20 } ]}>
        <Snackbar
          visible={this.state.snackVisible}
          message="New ordew has arrived!"
          onRequestClose={() => this.setState({ snackVisible: false })}
        />
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
    return order && order.orderStatus < 6 ? (
      <View
        key={'order_' + i}
        style={[ commonStyles.container, commonStyles.shadowSmall, { height: 100, marginBottom: 5 } ]}
      >
        <Grid>
          <Row style={commonStyles.rowList}>
            <Col size={6} style={[ commonStyles.columnList, commonStyles.justifyCenter ]}>
              <Text style={commonStyles.textBig}>Order ID: {order.orderId}</Text>
              <Text style={commonStyles.textSmall}>Time received: {order.timeReceived}</Text>
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
                    let newOrder = Object.assign(order);
                    console.log(newOrder);
                    newOrder.orderStatus++;
                    console.log(newOrder);
                    await putApiOrder(newOrder);
                    const orders = await getApiAllOrdersOfRestId(this.state.restaurant.restaurantId);
                    this.setState({
                      data: orders || []
                    });
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
        {/* <StompWsConnector onMessage={this.onStompWsMessage} /> */}
      </View>
    ) : (
      <View key={'no_order_' + i} />
    );
  };

  // async onStompWsMessage(message) {
  //   try {
  //     console.log('### 0 ###', 'Received message on OrdersScreen WebSocket');
  //     console.log('### 1 ###', message);

  //     if (message && message.type && message.type === 'order' && message.orderId) {
  //       var result = await this.state.data.find((item) => item.orderId === message.orderId);
  //       console.log('### 2 ###', result);

  //       if (result === undefined) {
  //         let order = await getApiOrderByOrderId(message.orderId);
  //         console.log('### 3 ###', order);

  //         let orders = [ order, ...this.state.data ];
  //         let sortedOrders = await orders.sort((a, b) => (a.orderId > b.orderId ? -1 : b.orderId > a.orderId ? 1 : 0));

  //         console.log('### 4 ###', 'Adding to state', order);

  //         if (!this._isMounted) {
  //           console.log('### 5 ###', 'onStompWsMessage while unmounted');
  //           return;
  //         }

  //         this.setState({ snackVisible: true, data: sortedOrders || [] });
  //         setTimeout(() => {
  //           this.setState({ snackVisible: false });
  //         }, 1000);
  //       } else console.log('### 6 ###', 'Got existing orderId from Socket');
  //     }
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }
}

//do we need this?
export default withNavigation(OrdersScreen);
