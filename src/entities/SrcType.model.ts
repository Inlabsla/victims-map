import { DataTypes } from 'sequelize';
import { sequelize } from '../config/connection/sequelizeHelper';

export const SrcType = sequelize.define(
  'SrcType',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    tipo_src: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  },
  {
    tableName: 'tipo_src'
  }
);
