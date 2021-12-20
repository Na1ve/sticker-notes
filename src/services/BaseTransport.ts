import { randomize } from '../utils/randomize';

const FROM = 80;
const TO = 350;

export const BaseTransport = {
  get: (url: string): Promise<any> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const result = localStorage.getItem(url);
        if (result) {
          resolve(JSON.parse(result));
        } else {
          reject(null);
        }
      }, randomize(FROM, TO));
    });
  },
  post: (url: string, data: any): Promise<any> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const result = localStorage.setItem(url, JSON.stringify(data));
        resolve(null);
      }, randomize(FROM, TO));
    });
  },
};
