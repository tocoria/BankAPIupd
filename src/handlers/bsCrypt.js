const bscrypt = require('bcrypt');
const saltRounds = 10;

const hashPassword = async(password) => {

  return await bscrypt.hash(password, saltRounds);
}

const comparePassword = async (password, hashedPassword) => {
  return await bscrypt.compare(password, hashedPassword)
}

module.exports = {
    hashPassword,
    comparePassword
}