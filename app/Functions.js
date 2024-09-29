import bcrypt from 'bcrypt';

const saltRounds = 10;

export async function hashPassword(password) {
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}

export async function comparePassword(password, hash) {
  const match = await bcrypt.compare(password, hash);
   return match;
}

(async () => {
  const password = 'mySuperSecretPassword123';

  // Hash the password
  const hashedPassword = await hashPassword(password);
  console.log('Hashed Password:', hashedPassword);

  // Verify the password
  const isMatch = await comparePassword(password, hashedPassword);
  console.log('Password Match:', isMatch);
  //return isMatch;
})();
