import { DataTypes } from 'sequelize';
import { define } from '../../config/sequelize';

// MODEL DEFINITION FOR USER
const User = define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
});

export default User;
