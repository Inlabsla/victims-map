import { CategorySrc } from '../entities/CategorySrc.model';

export class CategorySrcRepository {
  public static getCategorySrc = async () => {
    return CategorySrc.findAll({
      attributes: ['id', ['categoria_src', 'text']],
      raw: true,
      nest: true
    });
  };
}
