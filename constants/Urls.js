export default {
  apiRootUrl: 'https://eats-easy-spring.herokuapp.com/api/',
  apiVersionUrl: 'whoami',

  getApiAllOrdersofRestId: (id) => {
    return 'restaurants/' + id + '/orders';
  },
  getApiServiceCallsbyRestId: (id) => {
    return 'restaurants/' + id + '/servicecalls';
  },
  getApiRestIdbyEmployee: (id) => {
    return 'employees/' + id;
  }
};
