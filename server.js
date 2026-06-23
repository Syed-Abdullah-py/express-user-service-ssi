require('dotenv').config();
import { listen } from './src/app';
import connectDB from './src/config/db';

const PORT = 5000;

connectDB().then(() => {
  listen(PORT, () => console.log(`Server running on ${PORT}`));
});