import { User } from './types';

const users: User[] = [];

export const getUser = async (
  id: number
): Promise<[User | null, Error | null]> => {
  const user = users.find((user) => user.id === id);
  if (!user) return [null, new Error('User not found')];
  return [user, null];
};
