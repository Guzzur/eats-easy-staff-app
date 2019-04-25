import urls from '../constants/Urls';
const url = urls.apiRootUrl + urls.apiDishes;

export const getApiDishByDishId = async (id) => {
  try {
    const res = await fetch(url + '/' + id);
    if (res.status !== 200) return { dishName: undefined };
    const resJson = await res.json();
    if (resJson && resJson.length && resJson.length > 0) return resJson[0];
    return resJson;
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
};
