import { AsyncStorage } from 'react-native';

export default class StorageManager {

  // -------------------------------------------------------------------------
  // User
  // -------------------------------------------------------------------------

  _retrieveUserData = async () => {
    try {
      const retUser = await JSON.parse(await AsyncStorage.getItem('@MainStore:user'));
      return retUser;
    } catch (error) {
      console.warn('_retrieveUserData: Error retrieving data', error);
    }
  };

  _storeUserData = async (user) => {
    try {
      await AsyncStorage.setItem('@MainStore:user', JSON.stringify(user));
    } catch (error) {
      console.warn('_storeUserData: Error storing data', error);
    }
  };

  _removeUserData = async () => {
    try {
      await this._storeUserData(null);
    } catch (error) {
      console.warn('_removeUserData: Error removing data', error);
    }
  };
}
