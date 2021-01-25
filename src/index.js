const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded(
    { extended: false}
));

require('./controller/authController')(app);
require('./controller/collectionController')(app);

app.listen(process.env.PORT || 3000, () => {
    console.log('Server is running...')
});