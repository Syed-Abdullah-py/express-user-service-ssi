import dotenv from 'dotenv';
dotenv.config();

import app from './src/app.js';
import connectDB from './src/config/db.js';

const PORT = 8000;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
};

startServer();
