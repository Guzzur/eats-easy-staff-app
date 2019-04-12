export default {
  apiRootUrl: 'https://eats-easy-spring.herokuapp.com/api/',
  apiVersionUrl: 'whoami',
  apiUsers: 'users',
  apiSignIn: 'users/signin',
  apiSignUp: 'users/signup',
  apiServiceCall: 'callwaiter',

  apiAllOrdersofRestId: (id) => {
    return 'restaurants/' + id + '/orders';
  },
  apiServiceCallsbyRestId: (id) => {
    return 'restaurants/' + id + '/servicecalls';
  },
  apiRestIdbyEmployee: (id) => {
    return 'employees/' + id;
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
