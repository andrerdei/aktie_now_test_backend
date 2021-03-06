const mongoose = require('mongoose');
const connection = process.env.DB_HOST ? process.env.DB_HOST : 'mongodb://localhost/nodedb';

mongoose.connect(connection, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

mongoose.Promise = global.Promise;
module.exports = mongoose;