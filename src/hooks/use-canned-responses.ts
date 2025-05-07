import { useState, type SetStateAction, type Dispatch, useMemo } from 'react';
import type { CannedResponseFilterType } from '../types/filter-type';
import { CannedResponse, ResponsesCounts } from '../types/canned-responses';
import { privacyFilterCannedResponses } from './helpers/privacy-filter-canned-responses';
import useCannedStore from '../store/canned-store';

export interface UseCannedResponses {
  cannedResponses: CannedResponse[];
  isEmpty: boolean;
  setFilter: Dispatch<SetStateAction<CannedResponseFilterType>>;
  filter: CannedResponseFilterType;
  filteredItemsCounts: ResponsesCounts;
}

const filteredAndSortedResponses = (responses: CannedResponse[], filter: CannedResponseFilterType): CannedResponse[] =>
  privacyFilterCannedResponses(responses, filter).sort(
    (first, second) => second.modificationTimestamp - first.modificationTimestamp,
  );

export const useCannedResponses = (): UseCannedResponses => {
  const [filter, setFilter] = useState<CannedResponseFilterType>('all');
  const byIds = useCannedStore((state) => state.byIds);
  const items = Object.values(byIds);
  const isEmpty = items.length === 0;

  const itemsByCategory = useMemo(() => (isEmpty ? [] : filteredAndSortedResponses(items, filter)), [items, filter]);
  const filteredItems = items; // TODO implement search

  const filteredItemsCounts = useMemo(
    () => ({
      allCount: filteredItems.length,
      sharedCount: privacyFilterCannedResponses(filteredItems, 'shared').length,
      privateCount: privacyFilterCannedResponses(filteredItems, 'private').length,
    }),
    [filteredItems],
  );

  return {
    cannedResponses: itemsByCategory,
    setFilter,
    filter,
    isEmpty,
    filteredItemsCounts,
  };
};
