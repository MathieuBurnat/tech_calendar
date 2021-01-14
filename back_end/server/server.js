const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
global.Vocab = require('./api/models/testModel');
const routes = require('./api/routes/testRoutes');
mongoose.Promise = global.Promise;
mongoose.set('useFindAndModify', false);
mongoose.connect(
    'mongodb://localhost/Calendars',
    { useNewUrlParser: true }
);
const port = process.env.PORT || 3000;
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
routes(app);
app.listen(port);
app.use((req, res) => {
    res.status(404).send({ url: `${req.originalUrl} not found` });
});
console.log(`Server started on port ${port}`);