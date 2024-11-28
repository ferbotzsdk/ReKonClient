const mongoose = require('mongoose');

module.exports = (connection) => {
    const configDbModel = new mongoose.Schema({
        bucketName: {type: String, required: true},
        key:  {type: String, required: true},
        config: {type: mongoose.Schema.Types.Mixed, required: true},
    })

    return connection.model('ConfigElement', configDbModel);
};
