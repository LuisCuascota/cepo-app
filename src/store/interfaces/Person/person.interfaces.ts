import { FetchStateEnum } from "../../../shared/enums/fetchState.enum";

export interface PersonData {
  number: number;
  dni: string;
  names: string;
  surnames: string;
}

export interface PersonState {
  persons: PersonData[];
  getPersonsStatus: FetchStateEnum;
}
