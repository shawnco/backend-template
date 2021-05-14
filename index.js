const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(express.static(path.join(__dirname, 'client/build')));
app.use(bodyParser.json());
app.use(cors());

const APP_PORT = 5000;

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

app.listen(process.env.PORT || APP_PORT, () => {
    console.log('App is now live on port', process.env.PORT || APP_PORT);
});