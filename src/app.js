const mExpress = require('express')
let mongooseConnection = null
let configDbModel = null
let configMethods = null

function initFerbotzRekonClient(config , onConnectionStatus){
    const app = config.express || mExpress();
    app.use(mExpress.json());

    // db setup
    const mongoose = require('mongoose');
    mongooseConnection = mongoose.createConnection(config.mongoUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    mongooseConnection.on('error', e => {
        if (onConnectionStatus) {
            onConnectionStatus(
                {
                    code : 1,
                    error : e
                }
            );
        }
        console.log("mongo failed to init " + e )
    })
    mongooseConnection.on('open', () => {
        console.log("mongodb rekon client connected")
        const mConfigDbModel = require('./data/api/config/model/ConfigDbModel');
        configDbModel = mConfigDbModel(mongooseConnection)
        configMethods = require('./data/sdk/client/method/ConfigMethods')
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
    get configDbModel() { return configDbModel; },
    get configMethods() { return configMethods; }
};

