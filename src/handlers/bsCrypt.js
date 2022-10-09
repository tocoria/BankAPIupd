const bscrypt = require('bcrypt');
const saltRounds = 10;

const hashPassword = async(password) => {

  return await bscrypt.hash(password, saltRounds);
}

module.exports = {
    hashPassword
}