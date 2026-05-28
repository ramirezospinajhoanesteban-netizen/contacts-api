const express = require('express');
const contactsRoutes = require('./routes/contacts.routes');
const errorMiddleware = require('./middleware/error.middleware');

const app = express();

app.use(express.json());

app.use('/contacts', contactsRoutes);  // <-- era /api/contacts

app.use(errorMiddleware.notFound);
app.use(errorMiddleware.serverError);

module.exports = app;