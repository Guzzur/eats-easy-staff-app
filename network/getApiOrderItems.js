import urls from '../constants/Urls';
const url = urls.apiRootUrl + urls.apiOrderItems;

export const getApiOrderItems = async () => {
  try {
    const res = await fetch(url);
    if (res.status !== 200) return [];
    const resJson = await res.json();
    return resJson;
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
};
