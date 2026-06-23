import sequelize from './sequelize.js';
import User from '../modules/user/user.model.js';

const syncSchema = async () => {
  const tables = await sequelize.getQueryInterface().showAllTables();
  const hasUsersTable = tables.some(
    (table) => table.toLowerCase() === 'users'
  );

  if (hasUsersTable) {
    const tableInfo = await sequelize.getQueryInterface().describeTable('Users');
    const idType = tableInfo.id?.type?.toUpperCase() ?? '';

    if (!idType.includes('UUID')) {
      console.log('Migrating Users table from integer ID to UUID…');
      await sequelize.query('DROP TABLE IF EXISTS "Users" CASCADE');
      await User.sync();
      console.log('Users table recreated with UUID primary keys');
      return;
    }
  }

  await User.sync({ alter: true });
};

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('PostgreSQL connected');
    await syncSchema();
    console.log('Database synced');
  } catch (err) {
    console.error('Database connection failed:', err.message);
    process.exit(1);
  }
};

export default connectDB;
