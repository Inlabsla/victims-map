import { DataTypes } from 'sequelize';
import { sequelize } from '../config/connection/sequelizeHelper';

export const Acts = sequelize.define(
  'acts',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_hecho: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    desc_hecho: {
      type: DataTypes.STRING(200),
      allowNull: false
    }
  },
  {
    tableName: 'hechos',
    timestamps: true,
    underscored: true
  }
);
