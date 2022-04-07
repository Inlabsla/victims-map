import { DataTypes } from 'sequelize';
import { sequelize } from '../config/connection/sequelizeHelper';

export const PhaseStatus = sequelize.define(
  'PhaseStatus',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    estado_fase: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  },
  {
    tableName: 'estado_fase',
    timestamps: true,
    underscored: true
  }
);
