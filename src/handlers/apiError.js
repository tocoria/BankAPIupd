class apiError extends Error {


    constructor(message, code = 500, data){
        super(message);
        this.code = code;
        this.data = data;
        
    }
}

module.exports = {
    apiError
}