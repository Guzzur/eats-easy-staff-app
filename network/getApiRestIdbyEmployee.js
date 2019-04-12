import urls from '../constants/Urls';
const url = urls.apiRootUrl;

export const getApiRestIdbyEmployee = async (id) => {
  try {
    const res = await fetch(url + urls.apiRestIdbyEmployee(id));
    const resJson = await res.json();
    console.log('getApiRestIdbyEmployee', resJson);
    return resJson;
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
};
