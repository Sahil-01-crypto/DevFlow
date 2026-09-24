const cors = require('cors');

const express = require('express');
const cookieparser = require('cookie-parser');
const authrouter = require('./routes/auth.routes');
const projectrouter = require('./routes/project.routes');
const taskrouter = require('./routes/task.routes')
const app = express();

app.use(express.json());
app.use(cookieparser());

app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}))

app.use('/api/auth', authrouter);
app.use('/api/projects', projectrouter);
app.use('/api/tasks' ,taskrouter);


module .exports =app;