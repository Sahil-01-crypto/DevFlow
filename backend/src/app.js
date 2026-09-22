const express = require('express');
const cookieparser = require('cookie-parser');
const authrouter = require('./routes/auth.routes');
const projectrouter = require('./routes/project.routes');
const app = express();

app.use(express.json());
app.use(cookieparser());

app.use('/api/auth', authrouter);
app.use('/api/projects', projectrouter);


module .exports =app;