import { IZone } from 'app/entities/zone/zone.model';
import { IFarm } from 'app/entities/farm/farm.model';
import { ProFarmType } from 'app/entities/enumerations/pro-farm-type.model';
import { ProSubType } from 'app/entities/enumerations/pro-sub-type.model';

export interface IProtectedFarm {
  id?: number;
  protectedFarmID?: string | null;
  protectedFarmName?: string | null;
  protectedFarmType?: ProFarmType | null;
  protectedFarmSubType?: ProSubType | null;
  protectedFarmDescription?: string | null;
  zones?: IZone[] | null;
  farm?: IFarm | null;
}

export class ProtectedFarm implements IProtectedFarm {
  constructor(
    public id?: number,
    public protectedFarmID?: string | null,
    public protectedFarmName?: string | null,
    public protectedFarmType?: ProFarmType | null,
    public protectedFarmSubType?: ProSubType | null,
    public protectedFarmDescription?: string | null,
    public zones?: IZone[] | null,
    public farm?: IFarm | null
  ) {}
}

export function getProtectedFarmIdentifier(protectedFarm: IProtectedFarm): number | undefined {
  return protectedFarm.id;
}
