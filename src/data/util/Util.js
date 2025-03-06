
function notNullOrEmpty(value) {
    return value !== null && value !== undefined && value.toString().trim() !== '';
}

function throwError(code , message , causeCode){
    const e =  new Error(message)
    e.code = code || 500;
    e.causeCode = causeCode || -1
    throw e;
}

function version(version){
    const v = Number(version);
    return Number.isInteger(v) && v >= 0 && v <= Number.MAX_VALUE ? v : null;
}

function getValidValue(value) {
    return value !== null && value !== undefined && !Number.isNaN(value) ? value : null;
}

module.exports = {
    nnoe : notNullOrEmpty,
    throwError,
    version,
    getValidValue
}
