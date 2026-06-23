import express from 'express';
import userController from './user.controller.js';

const apiRouter = express.Router();
const formRouter = express.Router();

apiRouter.get('/', userController.getUsers);
apiRouter.get('/:id', userController.getUserById);

formRouter.post('/', userController.createUser);
formRouter.put('/:id', userController.updateUser);
formRouter.post('/:id', userController.updateUser);

export { apiRouter, formRouter };
