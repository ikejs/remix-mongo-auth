import bcrypt from 'bcryptjs';
import User from '~/models/User';

export const createUser = async (user) => {
  const password = await bcrypt.hash(user.password, 10);
  const newUser = await User.create({
    name: user.name,
    email: user.email,
    password,
  });
  return newUser;
};

export const getUser = async (query) => {
  const user = await User.findOne(query).exec();
  return user;
};
