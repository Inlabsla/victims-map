import { DataTypes } from 'sequelize';
import { sequelize } from '../config/connection/sequelizeHelper';

export const Fonts = sequelize.define(
  'fonts',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    fuente: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    tableName: 'fuente',
    timestamps: true,
    underscored: true
  }
);
