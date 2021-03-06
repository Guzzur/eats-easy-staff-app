export default {
  apiRootUrl: 'https://eats-easy-spring.herokuapp.com/api/',
  // apiRootUrl: 'http://192.168.2.140:8080/api/',
  apiVersionUrl: 'whoami',
  apiUsers: 'users',
  apiSignIn: 'users/signin',
  apiSignUp: 'users/signup',
  apiDishes: 'dishes',
  apiOrders: 'orders',
  apiPayments: 'payments',
  apiOrderItems: 'orderitems',
  apiServiceCall: 'callwaiter',

  apiAllOrdersofRestId: (id) => {
    return 'restaurants/' + id + '/orders';
  },
  apiServiceCallsbyRestId: (id) => {
    return 'restaurants/' + id + '/serviceCalls';
  },
  apiRestIdbyEmployee: (userId) => {
    return 'restaurants/' + userId + '/employee';
  },
  wsRootUrl: 'https://eats-easy-spring.herokuapp.com/stomp'
  // wsRootUrl: 'http://192.168.2.140:8080/stomp'

  // wsNewOrder: 'orders/new',
  // wsNewServiceCall: 'callwaiter/new',
  // wsOrdersStatusUpdate: 'orders/statusUpdate'
};
