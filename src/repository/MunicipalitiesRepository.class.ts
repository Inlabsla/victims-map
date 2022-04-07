import { Op } from 'sequelize';
import { Municipalities } from '../entities/Municipalities.model';

export class MunicipalitiesRepository {
  public static getMunicipalities = (params: any) => {
    const { mun } = params;
    let whereQuery;
    let options = {
      attributes: ['id', 'cod_mun', 'nombre_mun'],
      raw: true,
      order: ['id']
    };

    if (mun) {
      whereQuery = {
        where: {
          id: mun
        }
      };
      options = { ...options, ...whereQuery };
    }

    return Municipalities.findAll(options);
  };
}
