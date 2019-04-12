import urls from '../constants/Urls';
const url = urls.apiRootUrl;

export const getApiAllOrdersOfRestId = async (id) => {
  try {
    const res = await fetch(url + urls.apiAllOrdersofRestId(id));
    console.log('getApiAllOrdersOfRestId', res);
    // const resJson = await res.json();
    // return resJson;
    return [];
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
};
