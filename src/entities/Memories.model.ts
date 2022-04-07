import { DataTypes } from 'sequelize';
import { sequelize } from '../config/connection/sequelizeHelper';
import { Categories } from '../entities/Categories.model';
import { Resources } from '../entities/Resources.model';

export const Memories = sequelize.define(
  'memories',
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
    id_fuente_insumo: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    id_tipo_insumo: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    id_categoria: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    id_recurso: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    tableName: 'memorias',
    timestamps: true,
    underscored: true
  }
);

Memories.belongsTo(Categories, {
  foreignKey: 'id_categoria',
  targetKey: 'id'
});

Memories.belongsTo(Resources, {
  foreignKey: 'id_recurso',
  targetKey: 'id'
});
