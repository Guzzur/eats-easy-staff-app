import { AsyncStorage } from 'react-native';

export default class StorageManager {
  // -------------------------------------------------------------------------
  // Restaurant
  // -------------------------------------------------------------------------

  _retrieveRestaurantData = async () => {
    try {
      const restaurant = await JSON.parse(await AsyncStorage.getItem('@RestaurantViewStore:restaurant'));
      return restaurant;
    } catch (error) {
      console.warn('_retrieveRestaurantData: Error retrieving data', error);
    }
  };

  _storeRestaurantData = async (restaurant) => {
    try {
      await AsyncStorage.setItem('@RestaurantViewStore:restaurant', JSON.stringify(restaurant));
    } catch (error) {
      console.warn('_storeRestaurantData: Error storing data', error);
    }
  };

  _removeAllRestaurantData = async () => {
    try {
      this._storeRestaurantData(null);
    } catch (error) {
      console.warn('_removeRestaurantData: Error removing data', error);
    }
  };

  // -------------------------------------------------------------------------
  // Orders
  // -------------------------------------------------------------------------

  _retrieveAllOrdersData = async () => {
    try {
      const orders = await JSON.parse(await AsyncStorage.getItem('@RestaurantViewStore:orders'));
      return orders;
    } catch (error) {
      console.warn('_retrieveAllOrdersData: Error retrieving data', error);
    }
  };

  _retrieveAllOrdersOfRest = async (restaurantId) => {
    try {
      const orders = (await this._retrieveAllOrdersData()) || [];
      let retOrders = [];

      for (let item of orders) {
        if (item.restId === restaurantId) {
          retOrders.push(item);
        }
      }
      return retOrders;
    } catch (error) {
      console.warn('_retrieveAllOrdersOfRest: Error retrieving data', error);
    }
  };

  _storeOrdersData = async (orders) => {
    try {
      await AsyncStorage.setItem('@RestaurantViewStore:orders', JSON.stringify(orders));
    } catch (error) {
      console.warn('_storeOrdersData: Error storing data', error);
    }
  };

  _addToOrdersData = async (newOrder) => {
    try {
      const orders = (await this._retrieveAllOrdersData()) || [];
      orders.push(newOrder);
      await this._storeOrdersData(orders);
    } catch (error) {
      console.warn('_addToOrderData: Error storing data', error);
    }
  };

  _removeDishFromOrders = async (dishId) => {
    try {
      const orders = (await this._retrieveAllOrdersData()) || [];
      let newOrders = [];
      var found = false;

      for (let item of orders) {
        if (!found && item.dishId === dishId) {
          found = true;
        } else {
          newOrders.push(item);
        }
      }

      await this._storeOrdersData(newOrders);

      return newOrders;
    } catch (error) {
      console.warn('_removeDishFromOrders: Error storing data', error);
    }
  };

  _removeAllOrdersOfRest = async (restaurantId) => {
    try {
      const orders = (await this._retrieveAllOrdersData()) || [];
      let newOrders = [];

      for (let item of orders) {
        if (item.restId !== restaurantId) {
          newOrders.push(item);
        }
      }

      await this._storeOrdersData(newOrders);
    } catch (error) {
      console.warn('_removeAllOrdersOfRest: Error removing data', error);
    }
  };

  _removeAllOrders = async () => {
    try {
      await this._storeOrdersData([]);
    } catch (error) {
      console.warn('_removeAllOrders: Error removing data', error);
    }
  };

  // -------------------------------------------------------------------------
  // Orders statuses
  // -------------------------------------------------------------------------

  _retrieveAllOrderStatuses = async () => {
    try {
      const retOrderStatuses = await JSON.parse(await AsyncStorage.getItem('@RestaurantViewStore:ordersStatuses'));
      return retOrderStatuses;
    } catch (error) {
      console.warn('_retrieveOrderStatuses: Error retrieving data', error);
    }
  };

  _retrieveOrderStatusOfRest = async (restId) => {
    try {
      const ordersStatuses = (await this._retrieveAllOrderStatuses()) || [];
      let retOrderStatus = 0;

      for (let item of ordersStatuses) {
        if (item.restId === restId) {
          retOrderStatus = item;
          break;
        }
      }
      return retOrderStatus;
    } catch (error) {
      console.warn('_retrieveOrderStatusOfRest: Error retrieving data', error);
    }
  };

  _storeOrdersStatusesData = async (orders) => {
    try {
      await AsyncStorage.setItem('@RestaurantViewStore:ordersStatuses', JSON.stringify(orders));
    } catch (error) {
      console.warn('_storeOrdersStatusesData: Error storing data', error);
    }
  };

  _addToOrdersStatusesData = async (newOrder) => {
    try {
      const ordersStatuses = (await this._retrieveAllOrderStatuses()) || [];
      let found = false;

      for (let i = 0; i < ordersStatuses.length; i++) {
        if (ordersStatuses[i].restaurantId === newOrder.restaurantId) {
          found = true;
          ordersStatuses[i].orderStatus = newOrder.orderStatus;
          break;
        }
      }

      if (!found) ordersStatuses.push(newOrder);

      await this._storeOrdersStatusesData(ordersStatuses);
    } catch (error) {
      console.warn('_addToOrdersStatusesData: Error storing data', error);
    }
  };

  _removeOrderStatusOfRest = async (restaurantId) => {
    try {
      const ordersStatuses = (await this._retrieveAllOrderStatuses()) || [];
      let newOrdersStatuses = [];

      for (let item of ordersStatuses) {
        if (item.restId !== restaurantId) {
          newOrdersStatuses.push(item);
        }
      }

      await this._storeOrdersStatusesData(newOrdersStatuses);
    } catch (error) {
      console.warn('_removeOrderStatusOfRest: Error removing data', error);
    }
  };

  _removeAllOrdersStatuses = async () => {
    try {
      await this._storeOrdersStatusesData([]);
    } catch (error) {
      console.warn('_removeAllOrdersStatuses: Error removing data', error);
    }
  };

  // -------------------------------------------------------------------------
  // User
  // -------------------------------------------------------------------------

  _retrieveUserData = async () => {
    try {
      const retUser = await JSON.parse(await AsyncStorage.getItem('@MainStore:user'));
      return retUser;
    } catch (error) {
      console.warn('_retrieveUserData: Error retrieving data', error);
    }
  };

  _storeUserData = async (user) => {
    try {
      await AsyncStorage.setItem('@MainStore:user', JSON.stringify(user));
    } catch (error) {
      console.warn('_storeUserData: Error storing data', error);
    }
  };

  _removeUserData = async () => {
    try {
      await this._storeUserData(null);
    } catch (error) {
      console.warn('_removeUserData: Error removing data', error);
    }
  };

  // -------------------------------------------------------------------------
  // Table
  // -------------------------------------------------------------------------

  _retrieveAllTablesData = async () => {
    try {
      const tables = await JSON.parse(await AsyncStorage.getItem('@RestaurantViewStore:tables'));
      return tables;
    } catch (error) {
      console.warn('_retrieveTablesData: Error retrieving data', error);
    }
  };

  _retrieveTablesDataOfRest = async (restId) => {
    try {
      let retTables = [];
      const tables = (await this._retrieveAllTablesData()) || [];

      for (let item of tables) {
        if (item.restId === restId) {
          retTables.push(item);
        }
      }
      return retTables;
    } catch (error) {
      console.warn('_retrieveTablesData: Error retrieving data', error);
    }
  };

  _retrieveTableData = async () => {
    try {
      const table = await JSON.parse(await AsyncStorage.getItem('@RestaurantViewStore:table'));
      return table;
    } catch (error) {
      console.warn('_retrieveTableData: Error retrieving data', error);
    }
  };

  _storeTablesData = async (tables) => {
    try {
      await AsyncStorage.setItem('@RestaurantViewStore:tables', JSON.stringify(tables));
    } catch (error) {
      console.warn('_storeTablesData: Error storing data', error);
    }
  };

  _storeTableData = async (table) => {
    try {
      await AsyncStorage.setItem('@RestaurantViewStore:table', JSON.stringify(table));
    } catch (error) {
      console.warn('_storeTableData: Error storing data', error);
    }
  };

  _addToTablesData = async (newTables) => {
    try {
      const tables = (await this._retrieveAllTablesData()) || [];
      tables.push(newTables);
      await this._storeOrdersData(tables);
    } catch (error) {
      console.warn('_addToTablesData: Error storing data', error);
    }
  };

  _removeTablesData = async () => {
    try {
      await this._storeTablesData([]);
    } catch (error) {
      console.warn('_removeTablesData: Error removing data', error);
    }
  };

  _removeTableData = async () => {
    try {
      await this._storeTableData(null);
    } catch (error) {
      console.warn('_removeTableData: Error removing data', error);
    }
  };

  // -------------------------------------------------------------------------
  // Payment
  // -------------------------------------------------------------------------

  _retrievePaymentMethodData = async () => {
    try {
      const paymentMethod = await JSON.parse(await AsyncStorage.getItem('@RestaurantViewStore:paymentMethod'));
      return paymentMethod;
    } catch (error) {
      console.warn('_retrievePaymentMethodData: Error retrieving data', error);
    }
  };

  _storePaymentMethodData = async (paymentMethod) => {
    try {
      await AsyncStorage.setItem('@RestaurantViewStore:paymentMethod', JSON.stringify(paymentMethod));
    } catch (error) {
      console.warn('_storePaymentMethodData: Error storing data', error);
    }
  };

  _removePaymentMethodData = async () => {
    try {
      await this._storePaymentMethodData(null);
    } catch (error) {
      console.warn('_removePaymentMethodData: Error removing data', error);
    }
  };

  // -------------------------------------------------------------------------
  // Remove all
  // -------------------------------------------------------------------------

  _removeAllData = async () => {
    try {
      await this._removeAllRestaurantData();
      await this._removeAllOrders();
      await this._removeAllOrdersStatuses();
      await this._removeTablesData();
      await this._removeTableData();
      await this._removeUserData();
      await this._removePaymentMethodData();
    } catch (error) {
      console.warn('_removeAllData: Error removing data', error);
    }
  };
}
