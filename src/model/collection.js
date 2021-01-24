const mongoose = require('../database/connection');

const CollectionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        capitalize: true
    },
    genre: {
        type: String,
        required: true,
        capitalize: true
    },
    description: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Collection = mongoose.model('Collection', CollectionSchema);

module.exports = Collection;