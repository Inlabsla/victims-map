import { Ethnicity } from '../entities/Ethnicity.model';

export class EthnicityRepository {
  public static getEthnicity = async () => {
    return Ethnicity.findAll({
      attributes: [
        'id',
        ['pert_etnica', 'text']
      ],
      raw: true,
      nest: true
    });
  };
}
