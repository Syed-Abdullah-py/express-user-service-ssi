import sequelize from './sequelize.js';

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('PostgreSQL connected');
    await sequelize.sync();
    console.log('Database synced');
  } catch (err) {
    console.error('Database connection failed:', err.message);
    process.exit(1);
  }
};

export default connectDB;
