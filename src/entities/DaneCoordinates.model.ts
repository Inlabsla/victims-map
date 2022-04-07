import { DataTypes } from 'sequelize';
import { sequelize } from '../config/connection/sequelizeHelper';

export const DaneCoordinates = sequelize.define(
  'dane_coordinates',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    codigo_mun: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    id_codigo_mun: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    latitud: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    longitud: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  },
  {
    tableName: 'dane_coordenadas_municipios',
    underscored: true,
    timestamps: true
  }
);
