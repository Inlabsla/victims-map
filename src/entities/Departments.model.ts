import { DataTypes } from 'sequelize';
import { sequelize } from '../config/connection/sequelizeHelper';
import { DaneCoordinates } from './DaneCoordinates.model';
import { DaneProjection } from './DaneProjection.model';
import { Municipalities } from './Municipalities.model';
import { UniqueRegisterVictims } from './UniqueRegisterVictims.model';

export const Departments = sequelize.define(
  'dptos',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    cod_dpto: {
      type: DataTypes.STRING,
      allowNull: false
    },
    nombre_dpto: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    tableName: 'departamentos',
    timestamps: true,
    underscored: true
  }
);

Departments.hasMany(Municipalities, { foreignKey: 'id_dpto' });
Departments.hasMany(UniqueRegisterVictims, { foreignKey: 'id_dpto' });
