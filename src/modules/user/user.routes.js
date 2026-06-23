const router = require('express').Router();
import { createUser } from './user.controller';

// CREATE ROUTE
router.post('/', createUser);

// READ ROUTE
router.get('/', controller.getUsers);

export default router;
