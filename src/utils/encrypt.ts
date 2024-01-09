import * as argon2 from 'argon2';

export const encrypt = (password: string): Promise<string> => {
  const hashed = argon2.hash(password);
  return hashed;
};

export const verify = (hash: string, password: string): Promise<boolean> => {
  console.log(hash, password);
  return argon2.verify(hash, password);
};
