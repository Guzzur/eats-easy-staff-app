export default {
  apiRootUrl: 'https://eats-easy-spring.herokuapp.com/api/',
  // apiRootUrl: 'http://localhost:8080/api/',
  apiVersionUrl: 'whoami',
  apiUsers: 'users',
  apiSignIn: 'users/signin',
  apiSignUp: 'users/signup',
  apiOrders: 'orders',
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
  // wsRootUrl: 'wss://eats-easy-spring.herokuapp.com/socket/websocket/',
  wsRootUrl: 'ws://localhost:8080/socket/websocket/',
  wsNewOrder: 'orders/new',
  wsNewServiceCall: 'callwaiter/new',
  wsOrdersStatusUpdate: 'orders/statusUpdate'
};
