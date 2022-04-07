import { DataTypes } from 'sequelize';
import { sequelize } from '../config/connection/sequelizeHelper';

export const Subjects = sequelize.define(
  'Subjects',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_sujeto: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    nombre_sujeto: {
      type: DataTypes.STRING(400),
      allowNull: false
    }
  },
  {
    tableName: 'sujetos',
    timestamps: true,
    underscored: true
  }
);
