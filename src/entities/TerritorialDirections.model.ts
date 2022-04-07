import { DataTypes } from 'sequelize';
import { sequelize } from '../config/connection/sequelizeHelper';

export const TerritorialDirections = sequelize.define(
  'TerritorialDirections',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    cod_dt: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    nombre_dt: {
      type: DataTypes.STRING(200),
      allowNull: false
    }
  },
  {
    tableName: 'direcciones_territoriales',
    timestamps: true,
    underscored: true
  }
);
