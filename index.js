const express = require('express')
const app = express();
require('dotenv').config();
const port = process.env.PORT;

if (!process.env.PORT) { console.error('FATAL ERROR: App Port is not defined.'); process.exit(1); }
if (!process.env.JWT_SECRET) { console.error('FATAL ERROR: jwtPrivateKey is not defined.'); process.exit(1); }

require('./startup/securityPackages')(app);
require('./startup/db_connection');
require('./startup/logging');
require('./src/kafka');

require('./startup/router')(app);

require('./startup/pageNotFound')(app);

app.listen(port, () => {
  console.log(`Listening on port ${port}!`)
});

