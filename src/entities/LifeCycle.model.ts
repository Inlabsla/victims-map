import { DataTypes } from 'sequelize';
import { sequelize } from '../config/connection/sequelizeHelper';

export const LifeCycle = sequelize.define(
  'lifecycle',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    ciclo_vital: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  },
  {
    tableName: 'ciclo_vital',
    timestamps: true,
    underscored: true
  }
);
