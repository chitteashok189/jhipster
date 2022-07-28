import { IProtectedFarm } from 'app/entities/protected-farm/protected-farm.model';
import { FarmType } from 'app/entities/enumerations/farm-type.model';
import { SubType } from 'app/entities/enumerations/sub-type.model';

export interface IFarm {
  id?: number;
  farmID?: string | null;
  pformID?: string | null;
  farmName?: string | null;
  farmType?: FarmType | null;
  farmSubType?: SubType | null;
  farmDescription?: string | null;
  protectedFarms?: IProtectedFarm[] | null;
}

export class Farm implements IFarm {
  constructor(
    public id?: number,
    public farmID?: string | null,
    public pformID?: string | null,
    public farmName?: string | null,
    public farmType?: FarmType | null,
    public farmSubType?: SubType | null,
    public farmDescription?: string | null,
    public protectedFarms?: IProtectedFarm[] | null
  ) {}
}

export function getFarmIdentifier(farm: IFarm): number | undefined {
  return farm.id;
}
