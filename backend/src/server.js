const server = require('./app');
require('dotenv').config();

server.listen(process.env.PORT);
