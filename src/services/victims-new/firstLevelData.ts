import _ from 'lodash'
import { Acts } from '~/entities/Acts.model'
import { Categories } from '~/entities/Categories.model'
import { CategorySrc } from '~/entities/CategorySrc.model'
import { DaneProjection } from '~/entities/DaneProjection.model'
import { Departments } from '~/entities/Departments.model'
import { Disabilities } from '~/entities/Disabilities.model'
import { Ethnicity } from '~/entities/Ethnicity.model'
import { Genres } from '~/entities/Genres.model'
import { LifeCycle } from '~/entities/LifeCycle.model'
import { Memories } from '~/entities/Memories.model'
import { PhaseStatus } from '~/entities/PhaseStatus.model'
import { PircLockType } from '~/entities/PircLockTime.model'
import { Resources } from '~/entities/Resources.model'
import { SrcType } from '~/entities/SrcType.model'
import { SubjectsCollectiveReparation } from '~/entities/SubjectsCollectiveReparation.model'
import { UniqueRegisterVictims } from '~/entities/UniqueRegisterVictims.model'

const firstLevelData = async () => {
  const {
    territoryPopulation,
    territoryVictims,
    territoryActs,
    territoryCollectiveVictims,
    territories,
    ethnicity,
    genres,
    disabilities,
    lifecycle,
    categoriesSrc,
    pircLockType,
    srcType,
    phaseStatus,
    acts,
    memories,
  } = await processAllData()

  return {
    territoryName: 'COLOMBIA',
    territoryPopulation,
    territoryVictims,
    territoryActs,
    territoryCollectiveVictims,
    percentageVictims: (territoryVictims * 100) / territoryPopulation,
    percentageActs: (territoryActs * 100) / territoryPopulation,
    territories,
    ethnicity,
    genres,
    disabilities,
    lifecycle,
    categoriesSrc,
    pircLockType,
    srcType,
    phaseStatus,
    acts,
    memories,
  }
}

const processAllData = async () => {
  const ruv = UniqueRegisterVictims.findAll({
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
    include: {
      model: Acts,
      attributes: ['id', 'desc_hecho'],
    },
    raw: true,
    nest: true
  })
  const territoryPopulation = DaneProjection.sum('proyeccion_dane')
  const territoryVictims = UniqueRegisterVictims.count({
    distinct: true,
    col: 'cons_persona',
  })
  const territoryActs = UniqueRegisterVictims.count({
    col: 'id',
  })

  const territoryCollectiveVictims = SubjectsCollectiveReparation.count({
    col: 'id',
  })

  const territories = Departments.findAll({
    attributes: ['id', 'cod_dpto', 'nombre_dpto'],
    raw: true
  })

  const acts = await Acts.findAll({
    attributes: ['id', ['desc_hecho', 'text']],
    raw: true,
  })

  const data = await Promise.all([
    territoryPopulation,
    territoryVictims,
    territoryActs,
    territoryCollectiveVictims,
    territories,
    ruv,
  ]).then(async value => {
    const allTerritories = []

    const extraData: any = await processData(value[5], value[0], value[3], acts)

    for (let i = 0; i < value[4].length; i++) {
      const val: any = value[4][i]
      const ruvByDpto = value[5].filter((v: any) => v.id_dpto === val.id)

      const territoryVictimsDpto = await UniqueRegisterVictims.count({
        distinct: true,
        col: 'cons_persona',
        where: {
          id_dpto: val.id,
        },
      })

      const territoryPopulation = await DaneProjection.sum('proyeccion_dane', {
        where: {
          id_dpto: val.id,
        },
        raw: true,
      })
      const actsData = processAdditionalInformation(
        _.groupBy(ruvByDpto, 'id_hecho'),
        acts,
        territoryPopulation
      )

      allTerritories.push({
        id: val.id,
        territoryCode: val.cod_dpto,
        territoryName: val.nombre_dpto,
        territoryPopulation,
        territoryVictimsDpto,
        percentage: (territoryVictimsDpto * 100) / territoryPopulation,
        acts: actsData,
      })
    }

    return {
      territoryPopulation: value[0],
      territoryVictims: value[1],
      territoryActs: value[2],
      territoryCollectiveVictims: value[3],
      territories: allTerritories,
      lifecycle: extraData.lifecycles,
      disabilities: extraData.disabilities,
      ethnicity: extraData.ethnicities,
      genres: extraData.ethnicities,
      categoriesSrc: extraData.categoriesSrc,
      pircLockType: extraData.pircLockType,
      srcType: extraData.srcType,
      phaseStatus: extraData.phaseStatus,
      acts: extraData.acts,
      memories: extraData.memories,
    }
  })

  return data
}

const processData = async (
  ruv: any,
  totalPopulation: number,
  src: any,
  acts: any
) => {
  const actsData = processAdditionalInformation(
    _.groupBy(ruv, 'act.id'),
    acts,
    totalPopulation
  )

  const lifecycles = processAdditionalInformation(
    _.groupBy(ruv, 'id_ciclo_vital'),
    await LifeCycle.findAll({
      attributes: ['id', ['ciclo_vital', 'text']],
      raw: true,
    }),
    totalPopulation
  )

  const disabilities = processAdditionalInformation(
    _.groupBy(ruv, 'id_discap'),
    await Disabilities.findAll({
      attributes: ['id', ['desc_discapacidad', 'text']],
      raw: true,
    }),
    totalPopulation
  )
  const ethnicities = processAdditionalInformation(
    _.groupBy(ruv, 'id_pert_etnica'),
    await Ethnicity.findAll({
      attributes: ['id', ['pert_etnica', 'text']],
      raw: true,
    }),
    totalPopulation
  )
  const genres = processAdditionalInformation(
    _.groupBy(ruv, 'genero'),
    await Genres.findAll({
      attributes: ['id', ['genero', 'text']],
      raw: true,
    }),
    totalPopulation
  )
  const categoriesSrc = processAdditionalInformation(
    _.groupBy(src, 'id_categoria_src'),
    await CategorySrc.findAll({
      attributes: ['id', ['categoria_src', 'text']],
      raw: true,
    }),
    totalPopulation
  )
  const pircLockType = processAdditionalInformation(
    _.groupBy(src, 'id_tipo_cierre_pirc'),
    await PircLockType.findAll({
      attributes: ['id', ['tipo_cierre_pirc', 'text']],
      raw: true,
    }),
    totalPopulation
  )
  const srcType = processAdditionalInformation(
    _.groupBy(src, 'id_tipo_src'),
    await SrcType.findAll({
      attributes: ['id', ['tipo_src', 'text']],
      raw: true,
    }),
    totalPopulation
  )
  const phaseStatus = processAdditionalInformation(
    _.groupBy(ruv, 'id_estado_fase'),
    await PhaseStatus.findAll({
      attributes: ['id', ['estado_fase', 'text']],
      raw: true,
    }),
    totalPopulation
  )
  const memories = processAdditionalInformation(
    _.groupBy(ruv, ''),
    await Memories.findAll({
      attributes: ['id', 'id_dpto'],
      raw: true,
      nest: true,
      include: [
        {
          model: Resources,
          attributes: ['id', 'titulo_recurso'],
        },
        { model: Categories, attributes: ['categorias'] },
      ],
    }),
    totalPopulation,
    true
  )

  return {
    lifecycles,
    disabilities,
    genres,
    ethnicities,
    categoriesSrc,
    pircLockType,
    srcType,
    phaseStatus,
    acts: actsData,
    memories,
  }
}

const processAdditionalInformation = (
  grouped: any,
  array: any,
  totalPopulation: number,
  isForMemories?: boolean
) => {
  if (isForMemories) {
    return array
  }
  array.forEach((a: any) => {
    a.count = grouped[a.id] ? grouped[a.id].length : 0
    a.percentage = grouped[a.id]
      ? (grouped[a.id].length * 100) / totalPopulation
      : '0.00'
  })
  return array
}

export { firstLevelData }
