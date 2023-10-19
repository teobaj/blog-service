import { User } from './types';

import dotenv from 'dotenv';
dotenv.config();

const users: User[] = [];
let maxUsers: number = 100;
if (process.env.maxusers) {
  maxUsers = Number(process.env.maxusers);
}

console.log(maxUsers);

export const getUser = async (id: number): Promise<[User | null, Error | null]> => {
  const user = users.find((user) => user.id === id);
  if (!user) return [null, new Error('User not found.')];
  return [user, null];
};

export const addUser = async (user: Omit<User, 'id'>): Promise<[Boolean, Error | null]> => {
  if (users.length >= maxUsers) {
    return [false, new Error('Exceded Max users')];
  }
  const isAlreadyRegistered = users.find((u) => u.name === user.name);
  if (isAlreadyRegistered) {
    return [false, new Error('User already exists.')];
  }
  const newUser: User = {
    ...user,
    id: users.length + 1,
  };
  users.push(newUser);
  return [true, null];
};
