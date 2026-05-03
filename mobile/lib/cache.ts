import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

const createTokenCache = () => {
  return {
    async getToken(key: string) {
      try {
        const item = await SecureStore.getItemAsync(key);
        if (item) {
          console.log(`[TokenCache] Token found for key: ${key} 🔐`);
        } else {
          console.log(`[TokenCache] No token found for key: ${key}`);
        }
        return item;
      } catch (error) {
        console.error("[TokenCache] SecureStore get item error: ", error);
        await SecureStore.deleteItemAsync(key);
        return null;
      }
    },
    async saveToken(key: string, value: string) {
      try {
        console.log(`[TokenCache] Saving token for key: ${key}`);
        return SecureStore.setItemAsync(key, value);
      } catch (err) {
        console.error("[TokenCache] SecureStore save error: ", err);
        return;
      }
    },
  };
};

export const tokenCache = Platform.OS !== 'web' ? createTokenCache() : undefined;
