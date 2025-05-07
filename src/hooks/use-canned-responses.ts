import { useState, type SetStateAction, type Dispatch } from 'react';
import type { CannedResponseFilterType } from '../types/filter-type';
import { CannedResponse } from '../types/canned-responses';
import { privacyFilterCannedResponses } from './helpers/privacy-filter-canned-responses';
import useCannedStore from '../store/canned-store';

interface UseCannedResponses {
  cannedResponses: CannedResponse[];
  isEmpty: boolean;
  setFilter: Dispatch<SetStateAction<CannedResponseFilterType>>;
  filter: CannedResponseFilterType;
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

  return {
    cannedResponses: isEmpty ? [] : filteredAndSortedResponses(items, filter),
    setFilter,
    filter,
    isEmpty,
  };
};
