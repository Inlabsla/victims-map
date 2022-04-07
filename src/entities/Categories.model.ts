import { DataTypes } from 'sequelize';
import { sequelize } from '../config/connection/sequelizeHelper';

export const Categories = sequelize.define(
  'categories',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    categorias: {
      type: DataTypes.STRING(200),
      allowNull: false
    }
  },
  {
    tableName: 'categorias',
    timestamps: true,
    underscored: true
  }
);
