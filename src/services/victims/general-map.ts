import _ from 'lodash';
import { IGeneralView } from '../../models/dataModels/IGeneralView.model';
import { IMunicipalities } from '../../models/dataModels/IMunicipalities.model';
import { TerritoriesRepository } from '../../repository/TerritoriesRepository.class';
import { ActsService } from './ActsService.class';
import { CategorySrcService } from './CategorySrcService.class';
import { DisabilitiesService } from './DisabilitiesService.class';
import { EthnicityService } from './EthnicityService.class';
import { GenresService } from './GenresService.class';
import { LifecycleService } from './LifecycleService.class';
import { MemoriesService } from './MemoriesService.class';
import { PhaseStatusService } from './PhaseStatusService.class';
import { PircLockTypeService } from './PircLockTypeService.class';
import { SubjectsCollectiveReparationService } from './SubjectsCollectiveReparationService.class';
import { TypeSrcService } from './TypeSrcService.class';
import { UniqueVictimsRegisterService } from './UniqueVictimsRegisterService.class';

const generalMap = async (request: any) => {

  try {
    let territoryPopulation = 0;
    let territoryVictims = 0;
    let territoryActs = 0;

    let territoriesData: any = await getTerritoriesData(
      request
    );

    let territorynameAux = request.dpto === 'all' ? 'COLOMBIA' : '';
    if (request.dpto && request.mun) {
      territoriesData = territoriesData[0].municipalities;
      territorynameAux = territoriesData.map(
        (territory: any) => territory.nombre_mun
      )[0];
    }

    const territoriesIds = territoriesData.map(
      (territory: any) => territory.id
    );

    const uniqueVictimsRegister = await getUniqueRegisterVictims(
      territoriesIds,
      request
    );

    const collectiveVictims = await getSubjectsCollectiveReparation(
      request
    );

    const actsData: any[] = await ActsService.processActs();

    let territories: any[] = [];
    territoriesData.forEach((territory: any) => {
      const allProjectionsOfDepartment: number[] = territory.municipalities
        ? territory.municipalities.map(
            (municipality: any) =>
              municipality.dane_projection.proyeccion_dane
          )
        : territory.dane_projection.proyeccion_dane;

      const populationByDpto: any =
      request.dpto && request.mun
          ? allProjectionsOfDepartment
          : allProjectionsOfDepartment.reduce(
              (previousValue, currentValue) => previousValue + currentValue,
              0
            );
      territory.municipalities
        ? territory.municipalities.map(
            (mun: any) =>
              (territoryPopulation += mun.dane_projection.proyeccion_dane)
          )
        : (territoryPopulation = territory.dane_projection.proyeccion_dane);
      if (request.dpto !== 'all' && !request.mun) {
        territorynameAux = String(territory.nombre_dpto).toLocaleUpperCase();
        territory.municipalities = territory.municipalities.map(
          (municipality: any): IMunicipalities => {
            const municipalityVictims = uniqueVictimsRegister.filter(
              (victims: any) => municipality.id === victims.id_mun
            );

            const territoryPopulation =
              municipality.dane_projection.proyeccion_dane;
            const territoryVictims = municipalityVictims
              .map((victims: any) => victims.totalVictimsByAct)
              .reduce(
                (previousValue, currentValue) => previousValue + currentValue,
                0
              );

            return {
              id: municipality.id,
              territoryCode: municipality.cod_mun,
              territoryName: municipality.nombre_mun,
              territoryPopulation,
              territoryVictims,
              percentage: (territoryVictims * 100) / territoryPopulation
            };
          }
        );

        territories = territory.municipalities;
      } else if (!request.mun) {
        const victimsByTerritory = uniqueVictimsRegister.filter(
          (victims: any) =>
            request.mun && request.dpto
              ? territory.id === victims.id_mun
              : territory.id === victims.id_dpto
        );
        const actsByTerritory: any[] = [];
        actsData.forEach((a: any) => {
          const groupedActs = _.groupBy(victimsByTerritory, 'act.id');

          const totalActs = groupedActs[a.id] ? groupedActs[a.id].length : 0;

          actsByTerritory.push({
            id: a.id,
            percentage: (totalActs * 100) / populationByDpto
          });
        });

        const territoryVictims = victimsByTerritory
          .map((victims: any) => victims.totalVictimsByAct)
          .reduce(
            (previousValue, currentValue) => previousValue + currentValue,
            0
          );

        const responseTerritories: IGeneralView = {
          id: territory.id,
          territoryCode:
            request.mun && request.dpto
              ? territory.cod_mun
              : territory.cod_dpto,
          territoryName:
            request.mun && request.dpto
              ? territory.nombre_mun
              : territory.nombre_dpto,
          territoryPopulation: populationByDpto,
          territoryVictims,
          percentage: (territoryVictims * 100) / populationByDpto,
          acts: actsByTerritory
        };
        territories.push(responseTerritories);
      }
    });

    const {
      lifecycle,
      disabilities,
      ethnicity,
      genres,
      acts,
      categoriesSrc,
      pircLockType,
      typeSrc,
      phaseStatus,
      memories
    } = await getAdditionalData(
      uniqueVictimsRegister,
      territoryPopulation,
      collectiveVictims,
      actsData,
      request
    );

    uniqueVictimsRegister.forEach((uvr: any) => {
      territoryActs += uvr.totalActs;
      territoryVictims += uvr.totalVictimsByAct;
    });

    return {
      territoryname: territorynameAux,
      territoryPopulation,
      territoryVictims,
      percentageVictims: (territoryVictims * 100) / territoryPopulation,
      percentageActs: (territoryActs * 100) / territoryPopulation,
      territoryActs,
      territoryCollectiveVictims: collectiveVictims.length,
      territories: !territories.length ? undefined : territories,
      lifecycle,
      disabilities,
      ethnicity,
      genres,
      acts,
      categoriesSrc,
      pircLockType,
      typeSrc,
      phaseStatus,
      memories
    };
  } catch (error) {
    throw error;
  }
}

const getTerritoriesData = async (request: any) =>
    TerritoriesRepository.getTerritories(request);

  const getUniqueRegisterVictims = async (
    territoriesIds: number[],
    request: any
  ) =>
    UniqueVictimsRegisterService.processUniqueVictimsRegister(
      territoriesIds,
      request
    );

  const getSubjectsCollectiveReparation = async (request: any) =>
    SubjectsCollectiveReparationService.processSubjectsCollectiveReparation(
      request
    );
  const getAdditionalData = async (
    uniqueVictimsRegister: any[],
    territoryPopulation: number,
    collectiveVictims: any[],
    actsData: any[],
    params: any
  ) => {
    const lifecycle: any[] = processAdittionalData(
      await LifecycleService.processLifeCycle(),
      _.groupBy(uniqueVictimsRegister, 'id_ciclo_vital'),
      territoryPopulation
    );

    const disabilities: any[] = processAdittionalData(
      await DisabilitiesService.processDisabilities(),
      _.groupBy(uniqueVictimsRegister, 'id_discap'),
      territoryPopulation
    );
    const ethnicity: any[] = processAdittionalData(
      await EthnicityService.processEthnicity(),
      _.groupBy(uniqueVictimsRegister, 'id_pert_etnica'),
      territoryPopulation
    );

    const genres: any[] = processAdittionalData(
      await GenresService.processGenres(),
      _.groupBy(uniqueVictimsRegister, 'id_genero'),
      territoryPopulation
    );
    const acts: any[] = processAdittionalData(
      actsData,
      _.groupBy(uniqueVictimsRegister, 'act.id'),
      territoryPopulation
    );
    const categoriesSrc: any[] = processAdittionalData(
      await CategorySrcService.processCategorySrc(),
      _.groupBy(collectiveVictims, 'id_categoria_src'),
      territoryPopulation
    );
    const pircLockType: any[] = processAdittionalData(
      await PircLockTypeService.processPircLockType(),
      _.groupBy(collectiveVictims, 'id_tipo_cierre_pirc'),
      territoryPopulation
    );
    const typeSrc: any[] = processAdittionalData(
      await TypeSrcService.processTypeSrcService(),
      _.groupBy(collectiveVictims, 'id_tipo_src'),
      territoryPopulation
    );
    const phaseStatus: any[] = processAdittionalData(
      await PhaseStatusService.processPhaseStatus(),
      _.groupBy(collectiveVictims, 'id_estado_fase'),
      territoryPopulation
    );
    const memories: any[] = processAdittionalData(
      await MemoriesService.processMemories(params),
      _.groupBy(uniqueVictimsRegister, 'id_dpto'),
      territoryPopulation,
      true
    );

    return {
      lifecycle,
      disabilities,
      ethnicity,
      genres,
      acts,
      categoriesSrc,
      pircLockType,
      typeSrc,
      phaseStatus,
      memories
    };
  };

  const processAdittionalData = (
    array: any[],
    grouped: any,
    territoryPopulation: number,
    isForMemories?: boolean
  ) => {
    if (isForMemories) {
      return array;
    }
    array.forEach((a: any) => {
      a.count = grouped[a.id] ? grouped[a.id].length : 0;
      a.participationPercentage = grouped[a.id]
        ? (grouped[a.id].length * 100) / territoryPopulation
        : 0;
    });
    return array;
  };

export { generalMap }
