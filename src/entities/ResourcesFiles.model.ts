import { DataTypes } from 'sequelize';
import { sequelize } from '../config/connection/sequelizeHelper';

export const ResourcesFiles = sequelize.define(
  'files',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_recurso: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    nombre_archivo: {
      type: DataTypes.STRING(1000),
      allowNull: false,
    },
    descripcion_archivo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    url_s3_archivo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    external_url: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    tableName: 'archivos_recursos',
    timestamps: true,
    underscored: true
  }
);
