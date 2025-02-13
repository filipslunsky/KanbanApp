const { Router } = require('express');
const { authenticateLoginToken } = require('../middlewares/authenticate.js');
const {
    registeUser,
    loginUser,
    updateUser,
    updatePassword,
    deleteUser,
} = require('../controllers/usersController.js');

const usersRouter = Router();

usersRouter.post('/register', registeUser);
usersRouter.post('/login', loginUser);
usersRouter.put('/', authenticateLoginToken, updateUser);
usersRouter.put('/password', authenticateLoginToken, updatePassword);
usersRouter.post('/delete', authenticateLoginToken, deleteUser);

module.exports = usersRouter;
