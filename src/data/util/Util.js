
function notNullOrEmpty(value) {
    return value !== null && value !== undefined && value.toString().trim() !== '';
}

function throwError(code , message , causeCode){
    const e =  new Error(message)
    e.code = code || 500;
    e.causeCode = causeCode || -1
    throw e;
}

module.exports = {
    nnoe : notNullOrEmpty,
    throwError
}