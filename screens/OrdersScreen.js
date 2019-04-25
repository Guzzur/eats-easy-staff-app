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
import { getApiOrderItems } from '../network/getApiOrderItems';
import { getApiDishByDishId } from '../network/getApiDishByDishId';
// import { getApiOrderItemsByOrderId } from '../network/getApiOrderItemsByOrderId';
// import { getApiOrderByOrderId } from '../network/getApiOrderByOrderId';
import { putApiOrder } from '../network/putApiOrder';

class OrdersScreen extends Component {
  constructor() {
    super();
    this.state = {
      status: 'loading',
      data: [],
      statuses: [ 'Order placed', 'Preparing', 'Cooking', 'Serving', 'Completed' ],
      orderItems: [],
      orderItemsNamesMap: [],
      restaurant: null,
      user: null,
      snackVisible: false
    };
    this.storageManager = new StorageManager();
    this.updateOrdersData = this.updateOrdersData.bind(this);
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

          await this.updateOrdersData(orders);

          this.setState({
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
        if (!this.state.restaurant) {
          const restaurant = await getApiRestIdbyEmployee(this.state.user.userId);

          if (!restaurant) return;
          this.setState({ restaurant });
        }

        let orders = await getApiAllOrdersOfRestId(this.state.restaurant.restaurantId);

        if (orders.length !== this.state.data.length) {
          await this.updateOrdersData(orders);

          this.setState({ snackVisible: true });
          setTimeout(() => {
            this.setState({ snackVisible: false });
          }, 8000);
        }
      }, 10000)
    });
  }

  async updateOrdersData(orders) {
    let orderItemsApi = await getApiOrderItems();
    let orderItems = [];
    let orderItemsNamesMap = [];

    for (var order of orders) {
      for (var orderItem of orderItemsApi) {
        if (orderItems[order.orderId] === undefined) orderItems[order.orderId] = [];
        if (order.orderId === orderItem.orderId) {
          if (orderItemsNamesMap[orderItem.dishId] === undefined) {
            dish = await getApiDishByDishId(orderItem.dishId);
            orderItemsNamesMap[orderItem.dishId] = dish.dishName;
          }
          orderItem.dishName = orderItemsNamesMap[orderItem.dishId];
          orderItems[order.orderId].push(orderItem);
        }
      }
    }

    let sortedOrders =
      orders &&
      orders.length &&
      (await orders.sort((a, b) => (a.orderId > b.orderId ? -1 : b.orderId > a.orderId ? 1 : 0)));

    this.setState({
      data: sortedOrders || [],
      orderItems: orderItems,
      orderItemsNamesMap: orderItemsNamesMap
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
            {this.state.data.map(this.renderOrder)}
          </ScrollView>
        ) : (
          <LoadingCircle />
        )}
      </View>
    );
  }

  renderOrder = (order, i) => {
    if (order && order.orderId && order.orderStatus < 6) {
      return (
        <View key={'order_' + i} style={[ commonStyles.container, commonStyles.shadowSmall, { marginBottom: 5 } ]}>
          <Grid>
            <Row style={commonStyles.rowList}>
              <Col size={6} style={[ commonStyles.columnList, commonStyles.justifyCenter ]}>
                <Text style={commonStyles.textBig}>Order ID: {order.orderId}</Text>
                <Text style={commonStyles.textSmall}>Time received: {order.timeReceived}</Text>
                <Text style={commonStyles.textSmall}>Table ID: {order.tableId}</Text>
                <Text style={commonStyles.textSmall}>
                  Order status: {this.state.statuses[(order.orderStatus - 1) % this.state.statuses.length]}
                </Text>
                {this.state.orderItems[order.orderId].map(this.renderOrderDetails)}
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

                      let orders = await getApiAllOrdersOfRestId(this.state.restaurant.restaurantId);
                      let sortedOrders =
                        orders &&
                        orders.length &&
                        (await orders.sort((a, b) => (a.orderId > b.orderId ? -1 : b.orderId > a.orderId ? 1 : 0)));

                      this.setState({ data: sortedOrders || [] });
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
      );
    } else return <View key={'no_order_' + i} />;
  };

  // orderDetails = async (orderId) => {
  //   try {
  //     let orderItems = await getApiOrderItemsByOrderId(orderId);
  //     console.log(orderItems);
  //     return orderItems && orderItems.length > 0 ? orderItems.map(this.renderOrderDetails) : <View />;
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  renderOrderDetails = (item, i) => {
    return (
      <View key={'order_' + item.orderId + '_item_' + i}>
        <Text style={[ commonStyles.textSmall, { paddingLeft: 20 } ]}>+ {item.dishName}</Text>
      </View>
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
