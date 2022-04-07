import { TypeSrcRepository } from '../../repository/TypeSrcRepository.class';

export class TypeSrcService {
  public static processTypeSrcService = async () =>
    TypeSrcRepository.getTypeSrc();
}
