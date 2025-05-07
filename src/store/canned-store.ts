import { create } from 'zustand';
import { CannedResponsesState } from '../types/canned-responses';
import { initialState } from '../initial-state';

type BulkEditsStore = CannedResponsesState;

const useCannedStore = create<BulkEditsStore>((set, get) => ({
  byIds: initialState.entities.cannedResponses.byIds,
  allIds: initialState.entities.cannedResponses.allIds,
}));

export default useCannedStore;
