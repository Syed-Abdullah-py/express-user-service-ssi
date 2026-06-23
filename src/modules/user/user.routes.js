const router = require('express').Router();
import { createUser } from './user.controller';

router.post('/', createUser);

export default router;
