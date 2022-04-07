import { DataTypes } from 'sequelize';
import { sequelize } from '../config/connection/sequelizeHelper';

export const Ethnicity = sequelize.define(
  'Ethnicity',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    pert_etnica: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  },
  {
    tableName: 'pert_etnica',
    timestamps: true,
    underscored: true
  }
);
