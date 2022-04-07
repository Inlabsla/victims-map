import { DataTypes } from 'sequelize';
import { sequelize } from '../config/connection/sequelizeHelper';

export const Disabilities = sequelize.define(
  'Disabilities',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    discapacidad: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    desc_discapacidad: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    tableName: 'discapacidades',
    timestamps: true,
    underscored: true
  }
);
