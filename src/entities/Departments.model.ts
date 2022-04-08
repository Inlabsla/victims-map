import { DataTypes } from 'sequelize'
import { sequelize } from '../config/connection/sequelizeHelper'
import { DaneProjection } from './DaneProjection.model'

export const Departments = sequelize.define(
  'dptos',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    cod_dpto: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nombre_dpto: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'departamentos',
    timestamps: true,
    underscored: true,
  }
)

Departments.belongsTo(DaneProjection, {
  foreignKey: 'id',
  targetKey: 'id_dpto',
})
