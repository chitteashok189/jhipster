import { IProtectedFarm } from 'app/entities/protected-farm/protected-farm.model';
import { ZoneType } from 'app/entities/enumerations/zone-type.model';

export interface IZone {
  id?: number;
  zoneID?: string | null;
  zoneType?: ZoneType | null;
  manufacturer?: string | null;
  protectedFID?: string | null;
  protectedFarm?: IProtectedFarm | null;
}

export class Zone implements IZone {
  constructor(
    public id?: number,
    public zoneID?: string | null,
    public zoneType?: ZoneType | null,
    public manufacturer?: string | null,
    public protectedFID?: string | null,
    public protectedFarm?: IProtectedFarm | null
  ) {}
}

export function getZoneIdentifier(zone: IZone): number | undefined {
  return zone.id;
}
