import { SrcType } from '../entities/SrcType.model';

export class TypeSrcRepository {
  public static getTypeSrc = async () => {
    return SrcType.findAll({
      attributes: ['id', ['tipo_src', 'text']],
      raw: true,
      nest: true
    });
  };
}
