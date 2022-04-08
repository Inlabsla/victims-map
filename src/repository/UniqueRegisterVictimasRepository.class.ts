import { Op, Sequelize as sequelize } from 'sequelize'
import { Departments } from '~/entities/Departments.model'
import { Disabilities } from '~/entities/Disabilities.model'
import { Ethnicity } from '~/entities/Ethnicity.model'
import { Genres } from '~/entities/Genres.model'
import { LifeCycle } from '~/entities/LifeCycle.model'
import { Municipalities } from '~/entities/Municipalities.model'
import { Acts } from '../entities/Acts.model'
import { UniqueRegisterVictims } from '../entities/UniqueRegisterVictims.model'

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
          'totalVictimsByAct',
        ],
        [
          sequelize.literal('COUNT(unique_register_victims.id_hecho)::INT'),
          'totalActs',
        ],
      ],
      include: [
        {
          attributes: [
            'id',
            [sequelize.literal('UPPER(desc_hecho)'), 'desc_hecho'],
          ],
          model: Acts,
          required: true,
        },
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
        'id_ciclo_vital',
      ],
      order: [sequelize.literal('unique_register_victims.id_dpto,act.id')],
    }
    let queryWhere = {}

    if (params.dpto && params.dpto !== 'all' && !params.mun) {
      queryWhere = {
        where: {
          id_dpto: params.dpto,
        },
      }
      options = { ...options, ...queryWhere }
    } else if (params.dpto && params.mun) {
      queryWhere = {
        where: {
          id_dpto: params.dpto,
          id_mun: params.mun,
        },
      }
      options = { ...options, ...queryWhere }
    } else {
      queryWhere = {
        where: {
          id_dpto: {
            [Op.in]: dptosId,
          },
        },
      }
      options = { ...options, ...queryWhere }
    }

    return UniqueRegisterVictims.findAll(options)
  }

  public static getFirstLevelData = async () => {
    let options: any = {
      attributes: [
        'id',
        'id_hecho',
        'cons_persona',
        'id_dpto',
        'id_mun',
        'id_genero',
        'id_discap',
        'id_pert_etnica',
        'id_ciclo_vital',
      ],
      include: [
        {
          attributes: [
            'id',
            [sequelize.literal('UPPER(desc_hecho)'), 'desc_hecho'],
          ],
          model: Acts,
        },
        {
          attributes: ['id', [sequelize.literal('UPPER(nombre_dpto)'), 'nombre_dpto']],
          model: Departments,
        },
        {
          attributes: [
            'id',
            'cod_mun',
            [sequelize.literal('UPPER(nombre_mun)'), 'nombre_mun'],
          ],
          model: Municipalities,
        },
        {
          attributes: [
            'id',
            [
              sequelize.literal('UPPER(desc_discapacidad)'),
              'desc_discapacidad',
            ],
          ],
          model: Disabilities,
        },
        {
          attributes: ['id', [sequelize.literal('UPPER(genero)'), 'genero']],
          model: Genres,
        },
        {
          attributes: [
            'id',
            [sequelize.literal('UPPER(ciclo_vital)'), 'ciclo_vital'],
          ],
          model: LifeCycle,
        },
        {
          attributes: [
            'id',
            [sequelize.literal('UPPER(pert_etnica)'), 'pert_etnica'],
          ],
          model: Ethnicity,
        },
      ],
      raw: true,
      nest: true,
      order: [sequelize.literal('unique_register_victims.id_dpto,act.id')],
      where: {
        id_dpto: 17
      },
      limit: 1000
    }

    return UniqueRegisterVictims.findAll(options)
  }
}

UniqueRegisterVictims.belongsTo(Acts, {
  foreignKey: 'id_hecho',
  targetKey: 'id'
})

UniqueRegisterVictims.belongsTo(Departments, {
  foreignKey: 'id_dpto',
  targetKey: 'id'
})

UniqueRegisterVictims.belongsTo(Municipalities, {
  foreignKey: 'id_mun',
  targetKey: 'id'
})

UniqueRegisterVictims.belongsTo(Disabilities, {
  foreignKey: 'id_discap',
  targetKey: 'id'
})

UniqueRegisterVictims.belongsTo(Genres, {
  foreignKey: 'id_genero',
  targetKey: 'id'
})

UniqueRegisterVictims.belongsTo(LifeCycle, {
  foreignKey: 'id_ciclo_vital',
  targetKey: 'id'
})

UniqueRegisterVictims.belongsTo(Ethnicity, {
  foreignKey: 'id_pert_etnica',
  targetKey: 'id'
})
