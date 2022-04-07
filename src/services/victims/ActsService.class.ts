import _ from 'lodash';
import { ActsRepository } from '../../repository/ActsRepository.class';

export class ActsService {
  public static processActs = async () => ActsRepository.getActs();
}
