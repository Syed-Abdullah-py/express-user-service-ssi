import express, { urlencoded, static } from 'express';
import methodOverride from 'method-override';
import { join } from 'path';

import userRoutes from './modules/user/user.routes';

const app = express();

app.use(urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.use(static(join(__dirname, '../public')));

app.use('/users', userRoutes);

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, '../public/index.html'));
});

export default app;