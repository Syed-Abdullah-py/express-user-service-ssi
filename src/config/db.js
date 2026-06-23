import sequelize from './sequelize';

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('PostgreSQL Connected');
    await sequelize.sync();
  } catch (err) {
    console.error('DB Error:', err);
  }
};

export default connectDB;