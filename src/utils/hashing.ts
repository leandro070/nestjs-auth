// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcrypt');

export const hashPassword = async (password, saltRounds = 10) => {
  try {
    // Generate a salt
    const salt = await bcrypt.genSalt(saltRounds);

    // Hash password
    return await bcrypt.hash(password, salt);
  } catch (err) {
    console.log({ err });

    throw new Error('Error hashing password');
  }
};

export const comparePassword = async (password: string, hash: string) => {
  try {
    // Compare passwords
    const res = await bcrypt.compare(password, hash);
    return res;
  } catch (err) {
    console.log({ err });

    throw new Error('Error hashing password');
  }
};
