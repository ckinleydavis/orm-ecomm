/* Import web server, controller api routes
   and create db connection object */

const express = require('express');
// import express, { json, urlencoded } from 'express';
const routes = require('./routes');
const sequelize = require('./config/connection');

// Run web server on specific port
const app = express();
const PORT = process.env.port || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

/* Connect to database, force false so data isn't 
   dropped on sync, then start the web server */
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => 
        console.log(`App listening on port ${PORT}!`));
});