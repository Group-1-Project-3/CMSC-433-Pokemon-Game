const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 8080;

/* middleware */
app.use(express.static('/Users/joshbender/Dropbox/College/Summer 2021/CMSC 433/projects/CMSC-433-proj3/CMSC-433-Pokemon-Game/'));

/* server */
app.listen(port);

/* loggine */
console.log('Server started at http://localhost:' + port);