const mongoose = require('mongoose');

module.exports = (connection) => {
    const configDbModel = new mongoose.Schema({
        bucketName: { type: String, required: true },
        key: { type: String, required: true },
        config: { type: mongoose.Schema.Types.Mixed, required: true }
    });
    configDbModel.index({ bucketName: 1, key: 1 }, { unique: true });
    return connection.model('Config', configDbModel, "configs");
};
