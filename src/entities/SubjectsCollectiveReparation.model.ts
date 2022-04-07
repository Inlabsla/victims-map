import { DataTypes } from 'sequelize';
import { sequelize } from '../config/connection/sequelizeHelper';
import { CategorySrc } from './CategorySrc.model';
import { Departments } from './Departments.model';
import { Municipalities } from './Municipalities.model';
import { PhaseStatus } from './PhaseStatus.model';
import { PircLockType } from './PircLockTime.model';
import { SrcType } from './SrcType.model';
import { Subjects } from './Subjects.model';

export const SubjectsCollectiveReparation = sequelize.define(
  'SubjectsCollectiveReparation',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_sujeto: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    id_estado_fase: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    id_tipo_src: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    id_categoria_src: {
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
    id_tipo_cierre_pirc: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    fecha_resolucion: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    fecha_corte_reporte: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  },
  {
    tableName: 'sujetos_reparacion_colectiva',
    timestamps: true,
    underscored: true
  }
);

SubjectsCollectiveReparation.belongsTo(CategorySrc, {
  foreignKey: 'id_categoria_src',
  targetKey: 'id'
});
SubjectsCollectiveReparation.belongsTo(Departments, { foreignKey: 'id_dpto' });
SubjectsCollectiveReparation.belongsTo(PhaseStatus, {
  foreignKey: 'id_estado_fase',
  targetKey: 'id'
});
SubjectsCollectiveReparation.belongsTo(Municipalities, {
  foreignKey: 'id_mun'
});
SubjectsCollectiveReparation.belongsTo(Subjects, { foreignKey: 'id_sujeto' });
SubjectsCollectiveReparation.belongsTo(PircLockType, {
  foreignKey: 'id_tipo_cierre_pirc',
  targetKey: 'id'
});
SubjectsCollectiveReparation.belongsTo(SrcType, {
  foreignKey: 'id_tipo_src',
  targetKey: 'id'
});
