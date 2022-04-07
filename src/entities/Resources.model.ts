import { DataTypes } from 'sequelize';
import { sequelize } from '../config/connection/sequelizeHelper';

export const Resources = sequelize.define(
  'resource',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    titulo_recurso: {
      type: DataTypes.STRING(1000),
      allowNull: false
    },
    descripcion_recurso: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    tableName: 'recursos',
    timestamps: true,
    underscored: true
  }
);
