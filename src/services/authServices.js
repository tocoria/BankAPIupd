const { apiError } = require("../handlers/apiError.js");
const userServices = require("./userServices");
const encrypter = require('../handlers/bsCrypt.js');
const jwt = require("jsonwebtoken");
const config = require("../config");
const logger = require("../loaders/logger/index.js")

const login = async (email, password) => {

    try {

        const user = await userServices.findByEmail(email);
        if(!user) {
            throw new apiError("Email or password are incorrect", 400)
        }

        const match = await encrypter.comparePassword(password, user.password)

        if(!match) {
            throw new apiError("Email or password are incorrect FPH", 400);
        }

        const token = _encrypt(user._id);





        return {
            token,
            user: user.name,
            role: user.role
        }






    }
    catch(error) {
        throw error;
    }

}

const validateToken = async (token) => {
    
    try{

        if(!token){
            throw new apiError("Authorization failed: Token required.", 401)
        }

        logger.info(`Token received successfuly: ${token} `);

        let id;

            try{
                const obj = jwt.verify(token, config.auth.secret);
                id = obj.id;
            }

            catch(verifyError){
                throw new apiError("Authorization failed: Invalid token.", 401)
            }

        logger.info(`User id in the token: ${id}`);


        const user = await userServices.findById(id);

        logger.info(user);


        if(!user){
            throw new apiError('Unable to find user', 400);
        }
        if(!user.enabled){
            throw new apiError("User disabled.", 401);
        }

        return user;
    }
    catch(error){
        throw error
    }

}

// --------- _encrypt receives the user's id and generates a token to authorize requests -------- //

const _encrypt = (id) => {

  return  jwt.sign({id}, config.auth.secret, {expiresIn: config.auth.ttd})

}

const validRole =  (user, ...roles) => {

    if(!roles.includes(user.role)) {
        throw new apiError("Authorization failed.", 403);
    }
    return true;
}



module.exports = {
    login,
    validateToken,
    validRole
}