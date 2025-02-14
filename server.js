const express = require('express');
const cors = require('cors');
const path = require('path');

const usersRouter = require('./routes/usersRouter.js');
const projectsRouter = require('./routes/projectsRouter.js');
const categoriesRouter = require('./routes/categoriesRouter.js');
const tasksRouter = require('./routes/tasksRouter.js');

const PORT = 3001;

const app = express();

app.use(cors());
app.use(express.json());

app.use('/user', usersRouter);
app.use('/projects', projectsRouter);
app.use('/categories', categoriesRouter);

app.use(express.static(path.join(__dirname, "/client/dist")));
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

app.listen(PORT, () => {
    console.log(`listening to port ${PORT}`);
});
