import _ from 'lodash';
import { CategorySrcRepository } from '../../repository/CategorySrcRepository.class';

export class CategorySrcService {
  public static processCategorySrc = async () =>
    CategorySrcRepository.getCategorySrc();
}
