import urls from '../constants/Urls';
const url = urls.apiRootUrl + urls.apiOrders;

export const putApiOrder = async (data) => {
  try {
    const res = await fetch(url + '/' + data.orderId, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    });
    const retJson = await res.json();
    console.log(retJson);
    const { orderId } = retJson;
    return orderId;
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
};
