import { DataTypes } from 'sequelize'
import { sequelize } from '../config/connection/sequelizeHelper'

export const DaneProjection = sequelize.define(
  'dane_projections',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    id_mun: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_dpto: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    proyeccion_dane: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_dt: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: 'proyeccion_dane',
    timestamps: true,
    underscored: true,
  }
)
