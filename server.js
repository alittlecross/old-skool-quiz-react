const express = require('express');
const http = require('http');
const path = require('path');

const setupReact = require('./index');

const app = express();
const httpServer = http.createServer(app);
const port = process.env.PORT || 3001;
const publicUrl = process.env.PUBLIC_URL || '';

app.use(`${publicUrl}`, express.static(path.join(__dirname, 'build')));

app.use(`${publicUrl}`, setupReact);

httpServer.listen(port, () => {
  console.log(`\nlistening on port ${port}\n`); // eslint-disable-line no-console
});
