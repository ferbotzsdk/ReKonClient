const mExpress = require('express')
let mongooseConnection = null
let configDbModel = null
let bucketDbModel = null

function initFerbotzRekonClient(config , onConnectionStatus){
    const app = config.express || mExpress();
    app.use(mExpress.json());

    // db setup

    const mongoose = require('mongoose');
    mongooseConnection = mongoose.createConnection(config.mongoUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    mongooseConnection.on('error', (err) => {
        if (onConnectionStatus) {
            onConnectionStatus(
                {
                    code : 1,
                    error : e
                }
            );
        }
        console.log("mongo failed to init " + err )
    })
    mongooseConnection.on('open', () => {
        console.log("mongodb connected")
        const mBucketDbModel = require('./data/api/config/model/BucketDbModel');
        bucketDbModel = mBucketDbModel(mongooseConnection)
        const mConfigDbModel = require('./data/api/config/model/ConfigDbModel');
        configDbModel = mConfigDbModel(mongooseConnection)
        // Start server
        app.use("/rekon/config", require('./data/api/config/router/ConfigRouter').configRouter)
        if(!config.express){
            app.listen(config.port, () => {
                console.log(`Listening on port ${config.port}`);
                if (onConnectionStatus) {
                    onConnectionStatus(null);
                }
            });
        }else{
            if (onConnectionStatus) {
                onConnectionStatus(null);
            }
        }
    })
}

module.exports = { 
    initFerbotzRekonClient,
    get bucketDbModel() { return bucketDbModel; },
    get configDbModel() { return configDbModel; },
};

