import { IResource } from './IResource.model';

export interface IResourceResponse {
  id: number;
  resourceId: number;
  category: string;
  relatedCategoryQuestion: string;
  font: string;
  territoryName: string;
  inputType: string;
  resource: IResource;
}
