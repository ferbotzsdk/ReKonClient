const configDbModel = require('../../../../app').configDbModel;

async function readConfig(bucketName , configKeys){
    if (nnoe(bucketName)){
        try {
            if(configKeys && configKeys.length !== 0 ){
                const configs = await configDbModel.find({
                    bucketName: bucketName,
                    key: { $in: configKeys }
                }).select('key config -_id').lean();
                return configs;
            }else{
                const configs = await configDbModel.find({ 
                    bucketName: bucketName
                }).select('key config -_id').lean();
                return configs;
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