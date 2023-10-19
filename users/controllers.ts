import * as userService from './services';
import { User } from './types';
import { validateUser } from './validator';

export const getUser = async (id: number): Promise<[User | null, Error | null]> => {
  const [user, error] = await userService.getUser(id);
  if (error) {
    console.log(error.message);
  }
  return [user, error];
};

export const addUser = async (user: Omit<User, 'id'>): Promise<[Boolean | null, Error | null]> => {
  const isValid = validateUser(user);
  if (!isValid) {
    return [null, new Error('User properties are invalid')];
  }
  const [success, error] = await userService.addUser(user);
  if (!success) {
    console.log(error!.message);
  }
  return [success, error];
};
