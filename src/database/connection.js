const mongoose = require('mongoose');

mongoose.connect(process.env.DB_HOST ? process.env.DB_HOST : 'mongodb://localhost/nodedb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

mongoose.Promise = global.Promise;
module.exports = mongoose;