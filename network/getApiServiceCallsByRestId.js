import urls from '../constants/Urls';
const url = urls.apiRootUrl;

export const getApiServiceCallsByRestId = async (id) => {
  try {
    const res = await fetch(url + urls.apiServiceCallsbyRestId(id));
    console.log('getApiServiceCallsByRestId', res);
    // const resJson = await res.json();
    // return resJson;
    return [];
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
};
