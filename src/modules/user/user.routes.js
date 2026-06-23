import { Router } from 'express';
import * as userController from './user.controller.js';

export const apiRouter = Router();
export const formRouter = Router();

// JSON API (used by frontend fetch)
apiRouter.get('/', userController.getUsers);
apiRouter.get('/:id', userController.getUserById);

// HTML form submissions (redirect responses)
formRouter.post('/', userController.createUser);
formRouter.post('/:id/delete', userController.deleteUser);
formRouter.put('/:id', userController.updateUser);
formRouter.post('/:id', userController.updateUser);
formRouter.delete('/:id', userController.deleteUser);
