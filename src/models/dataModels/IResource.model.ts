import { IResourceFiles } from "./IResourceFiles.model";

export interface IResource {
  resourceTittle: string;
  resourceDescription: string;
  resourceFiles: IResourceFiles[]
}
