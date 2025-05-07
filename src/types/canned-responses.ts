import { KeyMap } from './types';

export interface CannedResponse {
  id: string;
  modificationTimestamp: number;
  tags: string[];
  text: string;
  createdBy?: string;
  modifiedBy?: string;
  avatarUrl?: string;
  isPrivate?: boolean;
}

export interface EntitiesState {
  cannedResponses: CannedResponsesState;
}

export interface StoreState {
  entities: EntitiesState;
}

export interface CannedResponsesState {
  byIds: KeyMap<CannedResponse>;
  allIds: string[];
}

export interface ResponsesCounts {
  allCount: number;
  sharedCount: number;
  privateCount: number;
}