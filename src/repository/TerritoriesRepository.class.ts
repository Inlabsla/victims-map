import { DaneProjection } from '../entities/DaneProjection.model';
import { Departments } from '../entities/Departments.model';
import { Municipalities } from '../entities/Municipalities.model';

export class TerritoriesRepository {
  public static getTerritories = (params: any) => {
    const { dpto, mun } = params ? params : { dpto: null, mun: null };

    let options: any = {
      attributes: ['id', 'cod_dpto', 'nombre_dpto'],
      include: {
        model: Municipalities,
        attributes: ['id', 'id_dpto', 'cod_mun', 'nombre_mun'],
        where: mun ? { id: mun } : undefined,
        include: [
          {
            attributes: ['proyeccion_dane'],
            model: DaneProjection
          }
        ]
      },
      group: [
        'dptos.id',
        'dptos.cod_dpto',
        'dptos.nombre_dpto',
        'municipalities.id',
        'municipalities.id_dpto',
        'municipalities.cod_mun',
        'municipalities.nombre_mun',
        'municipalities->dane_projection.id',
        'municipalities->dane_projection.proyeccion_dane'
      ],
      order: ['id']
    };
    let queryWhere = {};

    if (dpto && dpto !== 'all' && !mun) {
      queryWhere = {
        where: {
          id: dpto
        }
      };
      options = { ...options, ...queryWhere };
    } else if (dpto && mun) {
      queryWhere = {
        where: {
          id: dpto
        }
      };
      options = { ...options, ...queryWhere };
    }
    return Departments.findAll(options);
  };

  public static getOnlyDepartmens = () => Departments.findAll({
    attributes: ['id', 'cod_dpto', 'nombre_dpto']
  })

  
}
