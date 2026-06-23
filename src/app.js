import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

import { apiRouter, formRouter } from './modules/user/user.routes.js';
import methodOverrideMiddleware from './middleware/methodOverride.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverrideMiddleware);
app.use(express.static(path.join(__dirname, '../public')));

app.use('/api/users', apiRouter);
app.use('/users', formRouter);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
