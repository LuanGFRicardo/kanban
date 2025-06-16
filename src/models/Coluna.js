import { DataTypes } from 'sequelize';
import db from '../config/dbConnect.js';

const Coluna = db.define('Coluna', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  ordem: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  quadroId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

export default Coluna;
