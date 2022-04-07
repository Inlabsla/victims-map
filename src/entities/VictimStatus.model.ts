import { DataTypes } from 'sequelize';
import { sequelize } from '../config/connection/sequelizeHelper';

export const VictimStatus = sequelize.define(
  'VictimStatus',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    estado_victima: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    tableName: 'estado_victima'
  }
);
