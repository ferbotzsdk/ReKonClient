const router = require("express").Router();
const nnoe = require("../../../util/Util").nnoe
const bucketDbModel = require('../../../../app').bucketDbModel;
const configDbModel = require('../../../../app').configDbModel;

router.get("/:bucketName/get", async (req, res) => {
    const bucketName = req.params.bucketName;
    if(nnoe(bucketName)) {
        const bucketExist = await bucketDbModel.exists({bucketName: bucketName});
        if (bucketExist !== null) {
            const key = req.query.key
            if (nnoe(key)){
                const keyConfig = await configDbModel.findOne(
                    {
                        bucketName: bucketName,
                        key: key
                    }
                ).select('key config -_id')
                if (nnoe(keyConfig)) {
                    res.status(200).json(keyConfig);
                }else {
                    res.status(404).json({message: `key ${key} not found`})
                }
            }else{
                const configValues = await configDbModel.find({bucketName: bucketName}).select('key config -_id')
                res.status(200).json(configValues)
            }
        }else {
            res.status(404).json({message: 'Bucket not found'})
        }
    }else {
        res.status(404).json({message:"Enter bucket name"});
    }
})

module.exports.configRouter = router;