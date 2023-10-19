import { User } from './types';

export const validateUser = (user: object): boolean => {
  const userProperties: Omit<User, 'id'> = {
    name: '',
  };
  for (const k in userProperties) {
    if (!(k in user) || !(typeof (user as any)[k] === typeof (userProperties as any)[k])) {
      return false;
    }
  }
  return true;
};
