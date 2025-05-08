import { create } from 'zustand';
import { CannedResponse, CannedResponsesState } from '../types/canned-responses';
import { initialState } from '../initial-state';
import { CannedResponseFilterType } from '../types/filter-type';

type BulkEditsStore = CannedResponsesState & {
  search: string; 
  setSearch: (search: string) => void;
  filter: CannedResponseFilterType;
  setFilter: (filter: CannedResponseFilterType) => void;
  listItems: Array<CannedResponse>;
  setListItems: (listItems: Array<CannedResponse>) => void;
};

const useCannedStore = create<BulkEditsStore>((set, get) => ({
  byIds: initialState.entities.cannedResponses.byIds,
  allIds: initialState.entities.cannedResponses.allIds,
  search: '',
  setSearch: (search: string) => set(() => ({ search })),
  filter: 'all',
  setFilter: (filter: CannedResponseFilterType) => set(() => ({ filter })),
  listItems: initialState.entities.cannedResponses.allIds.map((id) => initialState.entities.cannedResponses.byIds[id]),
  setListItems: (listItems: Array<CannedResponse>) => set(() => ({ listItems })),
}));

export default useCannedStore;
