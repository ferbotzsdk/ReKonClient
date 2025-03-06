const configDbModel = require('../../../../app').configDbModel;
const { nnoe , throwError , getValidValue} = require('../../../util/Util')

async function readConfig(bucketName , configKeys , version){
    if (nnoe(bucketName)){
        try {
            if(configKeys && configKeys.length !== 0 ){
                const query = {
                    bucketName: bucketName ,
                    key: { $in: configKeys },
                };
                if (version !== null) {
                    query["config.minVersion"] = { $lte: version };
                    query["config.maxVersion"] = { $gte: version };
                }
                const projection = { key: 1, _id: 0 };
                if (version !== null) {
                    projection["config.$"] = 1;
                } else {
                    projection["config"] = 1;
                }
                const result = await configDbModel.find(query, projection).lean();
                return result.map(item => ({
                    key: item.key,
                    config: getValidValue(item.config[item.config.length - 1]?.data)
                }));
            }else{
                const query = { bucketName: bucketName };
                if (version !== null) {
                    query["config.minVersion"] = { $lte: version };
                    query["config.maxVersion"] = { $gte: version };
                }
                const projection = { key: 1, _id: 0 };
                if (version !== null) {
                    projection["config.$"] = 1;
                } else {
                    projection["config"] = 1;
                }
                const result = await configDbModel.find(query, projection).lean();
                return result.map(item => ({
                    key: item.key,
                    config: getValidValue(item.config[item.config.length - 1]?.data)
                }));
            }
        }catch (error) {
            throwError(404,error.message,  error.causeCode || 2);
        }
    }else {
        throwError(404,"Enter bucket name");
    }
}

module.exports = {
    readConfig
}
