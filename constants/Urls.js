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
  }
};

// export default {
//   apiRootUrl: 'https://eats-easy-spring.herokuapp.com/api/',
//   apiVersionUrl: 'whoami',
//   apiAllRestaurants: 'restaurants',
//   apiOrders: 'orders',
//   apiOrderItem: 'orderitems',
//   apiUsers: 'users',
//   apiSignIn: 'users/signin',
//   apiSignUp: 'users/signup',
//   apiServiceCall: 'callwaiter',
//   apiPayments: 'payments',
//   apiRestaurantMenu: (id) => {
//     return 'restaurants/' + id + '/menu';
//   },
//   apiFreeTables: (id) => {
//     return 'restaurants/' + id + '/freeTables';
//   }
// };
