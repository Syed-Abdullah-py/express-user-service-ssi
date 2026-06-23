import express from 'express';
import methodOverride from 'method-override';
import path from 'path';
import { fileURLToPath } from 'url';

import { apiRouter, formRouter } from './modules/user/user.routes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  methodOverride((req) => {
    if (req.body?._method) return req.body._method;

    const query = new URL(req.url, 'http://localhost').searchParams;
    return query.get('_method') ?? undefined;
  })
);
app.use(express.static(path.join(__dirname, '../public')));

app.use('/api/users', apiRouter);
app.use('/users', formRouter);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

export default app;
