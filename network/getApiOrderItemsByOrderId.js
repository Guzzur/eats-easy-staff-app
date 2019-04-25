import urls from '../constants/Urls';
const url = urls.apiRootUrl + urls.apiOrderItems;

export const getApiOrderItemsByOrderId = async (orderId) => {
  try {
    let retOrders = [];
    const res = await fetch(url);
    if (res.status !== 200) return [];
    const resJson = await res.json();

    for (var order of resJson) if (order.orderId === orderId) retOrders.push(order);
    return retOrders;
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
};
