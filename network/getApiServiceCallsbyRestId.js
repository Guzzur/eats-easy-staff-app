import urls from '../constants/Urls';
const url = urls.apiRootUrl;

export const getApiServiceCallsbyRestId = async (id) => {
  try {
    const res = await fetch(url + urls.getApiServiceCallsbyRestId(id));
    const resJson = await res.json();
    return resJson;
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
};
