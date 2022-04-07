import { DataTypes } from 'sequelize';
import { sequelize } from '../config/connection/sequelizeHelper';
import { Acts } from '../entities/Acts.model';
import { LifeCycle } from './LifeCycle.model';

export const UniqueRegisterVictims = sequelize.define(
  'unique_register_victims',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    cons_persona: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    id_dpto: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    id_mun: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    id_coordenadas_mun: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    id_proyeccion: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    id_estado_victima: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    id_hecho: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    id_genero: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    id_pert_etnica: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    id_discap: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    id_ciclo_vital: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    fecha_ocurrencia: {
      type: DataTypes.STRING(20),
      allowNull: false
    }
  },
  {
    tableName: 'registro_unico_victimas',
    timestamps: true,
    underscored: true
  }
);

UniqueRegisterVictims.belongsTo(Acts, {
  foreignKey: 'id_hecho',
  targetKey: 'id'
});

UniqueRegisterVictims.belongsTo(LifeCycle, {
  foreignKey: 'id_ciclo_vital',
  targetKey: 'id'
});
