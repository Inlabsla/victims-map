import { Sequelize } from 'sequelize';
import { SubjectsCollectiveReparation } from '../entities/SubjectsCollectiveReparation.model';

export class SubjectsCollectiveReparationRepository {
  public static getSubjectsCollectiveReparationRepository = async (
    params: any
  ) => {
    let options = {
      attributes: [
        'id',
        'id_dpto',
        'id_estado_fase',
        'id_tipo_src',
        'id_categoria_src',
        'id_tipo_cierre_pirc'
      ],
      raw: true,
      nest: true
    };

    let queryWhere = {};
    if (params.dpto && params.dpto !== 'all' && !params.mun) {
      queryWhere = {
        where: {
          id_dpto: params.dpto
        }
      };
      options = { ...options, ...queryWhere };
    } else if (params.dpto && params.mun) {
      queryWhere = {
        where: {
          id_dpto: params.dpto,
          id_mun: params.mun
        }
      };
      options = { ...options, ...queryWhere };
    } else {
      queryWhere = {};
      options = { ...options, ...queryWhere };
    }

    return SubjectsCollectiveReparation.findAll(options);
  };
}
