import { DataTypes } from 'sequelize';
import { sequelize } from '../config/connection/sequelizeHelper';
import { DaneCoordinates } from './DaneCoordinates.model';
import { DaneProjection } from './DaneProjection.model';

export const Municipalities = sequelize.define(
  'municipalities',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_dpto: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    cod_mun: {
      type: DataTypes.STRING,
      allowNull: false
    },
    nombre_mun: {
      type: DataTypes.STRING,
      allowNull: false
    },
    capital: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  },
  {
    tableName: 'municipios',
    timestamps: true,
    underscored: true
  }
);

Municipalities.hasOne(DaneCoordinates, { foreignKey: 'id_codigo_mun' });
Municipalities.hasOne(DaneProjection, { foreignKey: 'id_mun' });
