import express from 'express';
import userController from './user.controller.js';

const apiRouter = express.Router();
const formRouter = express.Router();

apiRouter.get('/', userController.getUsers);
apiRouter.get('/:id', userController.getUserById);

formRouter.post('/', userController.createUser);

export { apiRouter, formRouter };
