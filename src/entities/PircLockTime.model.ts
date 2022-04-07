import { DataTypes } from 'sequelize';
import { sequelize } from '../config/connection/sequelizeHelper';

export const PircLockType = sequelize.define(
  'PircLockType',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    tipo_cierre_pirc: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  },
  {
    tableName: 'tipo_cierre_pirc'
  }
);
