const router = require("express").Router();
const {readConfig} = require('../../../sdk/client/method/ConfigMethods')
const {version} = require('../../../util/Util')

router.get("/:bucketName/get", async (req, res) => {
    try{
        const configKeys = req.query.configKeys
        ? req.query.configKeys.split(',')
        : [];
        const config = await readConfig(req.params.bucketName , configKeys , version(req.headers['clientVersion']) )
        res.status(200).json(config)
    }catch(error){
        res.status(error.code || 500).json({message: error.message});
    }
})

module.exports.configRouter = router;
