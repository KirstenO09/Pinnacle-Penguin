const express = require('express')
const cors = require('cors')
const app = express()
const routes = require('./routes')
const path = require('path');


app.use(express.json()) // **dpop09** Enable JSON parsing for incoming requests
app.use(cors({ origin: '*' })) // **dpop09** Use CORS middleware to allow cross-origin requests

app.use('/', routes)    // **dpop09** all routes are mounted on the root path

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, '../client/build')));

// Anything that doesn't match the above, send back the index.html file
// This is for supporting browser history fallback in SPAs
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// Start running server on the specified port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}.`);
});