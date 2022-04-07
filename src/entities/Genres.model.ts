import { DataTypes } from 'sequelize';
import { sequelize } from '../config/connection/sequelizeHelper';

export const Genres = sequelize.define(
  'Genres',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    genero: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    tableName: 'generos',
    timestamps: true,
    underscored: true
  }
);
