import urls from '../constants/Urls';
const url = urls.apiRootUrl + urls.apiServiceCall;

export const deleteApiServiceCall = async (id) => {
  try {
    const res = await fetch(url + '/' + id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    });
    return;
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
};
