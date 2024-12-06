const mongoose = require('mongoose');

module.exports = (connection) => {
    const bucketDbModel = new mongoose.Schema({
        bucketName: {type: String, required: true , unique: true}
    })

    return connection.model('Bucket', bucketDbModel, "bucket");
};