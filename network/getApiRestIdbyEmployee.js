import urls from '../constants/Urls';
const url = urls.apiRootUrl;

export const getApiRestIdbyEmployee = async (userId) => {
  try {
    const res = await fetch(url + urls.apiRestIdbyEmployee(userId));
    const resJson = await res.json();
    return resJson;
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
};
