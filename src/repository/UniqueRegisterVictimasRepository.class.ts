import { Op, Sequelize as sequelize } from 'sequelize';
import { Acts } from '../entities/Acts.model';
import { UniqueRegisterVictims } from '../entities/UniqueRegisterVictims.model';

export class UniqueRegisterVictimsRepository {
  public static getUniqueRegisterVictims = async (
    dptosId: number[],
    params: any
  ) => {
    let options: any = {
      attributes: [
        'id_dpto',
        'id_mun',
        'id_genero',
        'id_discap',
        'id_pert_etnica',
        'id_ciclo_vital',
        [
          sequelize.literal('COUNT(DISTINCT cons_persona)::INT'),
          'totalVictimsByAct'
        ],
        [
          sequelize.literal('COUNT(unique_register_victims.id_hecho)::INT'),
          'totalActs'
        ]
      ],
      include: [
        {
          attributes: [
            'id',
            [sequelize.literal('UPPER(desc_hecho)'), 'desc_hecho']
          ],
          model: Acts,
          required: true
        }
      ],
      raw: true,
      nest: true,
      group: [
        'unique_register_victims.id_dpto',
        'unique_register_victims.id_mun',
        'act.id',
        'id_genero',
        'id_discap',
        'id_pert_etnica',
        'id_ciclo_vital'
      ],
      order: [sequelize.literal('unique_register_victims.id_dpto,act.id')]
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
      queryWhere = {
        where: {
          id_dpto: {
            [Op.in]: dptosId
          }
        }
      };
      options = { ...options, ...queryWhere };
    }

    return UniqueRegisterVictims.findAll(options);
  };
}
