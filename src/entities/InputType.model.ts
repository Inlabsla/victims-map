import { DataTypes } from 'sequelize';
import { sequelize } from '../config/connection/sequelizeHelper';

export const InputType = sequelize.define(
  'inputType',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    tipo_insumo: {
      type: DataTypes.STRING(200),
      allowNull: false
    }
  },
  {
    tableName: 'tipo_insumo',
    timestamps: true,
    underscored: true
  }
);
