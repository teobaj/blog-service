import * as userService from './services';
import { User } from './types';

export const getUser = async (
  id: number
): Promise<[User | null, Error | null]> => {
  const [user, error] = await userService.getUser(id);
  if (error) {
    console.log(error.message);
  }
  return [user, error];
};
