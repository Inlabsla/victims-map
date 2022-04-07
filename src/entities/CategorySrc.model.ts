import { DataTypes } from 'sequelize';
import { sequelize } from '../config/connection/sequelizeHelper';

export const CategorySrc = sequelize.define(
  'CategorySrc',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    categoria_src: {
      type: DataTypes.STRING(500),
      allowNull: false
    }
  },
  {
    tableName: 'categoria_src',
    timestamps: true,
    underscored: true
  }
);
