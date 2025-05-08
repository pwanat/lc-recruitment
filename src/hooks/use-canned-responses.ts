import { useState, type SetStateAction, type Dispatch, useMemo, useEffect } from 'react';
import type { CannedResponseFilterType } from '../types/filter-type';
import { CannedResponse, ResponsesCounts } from '../types/canned-responses';
import { privacyFilterCannedResponses } from './helpers/privacy-filter-canned-responses';
import useCannedStore from '../store/canned-store';
import { useDebounce } from 'use-debounce';

export interface UseCannedResponses {
  isEmpty: boolean;
  searchedItemsCounts: ResponsesCounts;
}

const filteredAndSortedResponses = (responses: CannedResponse[], filter: CannedResponseFilterType): CannedResponse[] =>
  privacyFilterCannedResponses(responses, filter).sort(
    (first, second) => second.modificationTimestamp - first.modificationTimestamp,
  );

const searchInString = (item: string, search: string): boolean => {
  return item.toLowerCase().includes(search.toLowerCase());
};

const searchInItem = (item: CannedResponse, search: string): boolean => {
  if (!search) return true;
  const { text, tags, createdBy } = item;
  const searchSource = [text, ...tags, createdBy ?? ''].join(' ');
  return searchInString(searchSource, search);
};

export const useCannedResponses = (): UseCannedResponses => {
  const items = Object.values(useCannedStore((state) => state.byIds));
  
  const filter = useCannedStore((state) => state.filter);
  const search = useCannedStore((state) => state.search);
  const setListItems = useCannedStore((state) => state.setListItems);

  const searchedItems = useMemo(() => items.filter((item) => searchInItem(item, search)), [items, search]);

  const searchedItemsCounts = useMemo(
    () => ({
      allCount: searchedItems.length,
      sharedCount: privacyFilterCannedResponses(searchedItems, 'shared').length,
      privateCount: privacyFilterCannedResponses(searchedItems, 'private').length,
    }),
    [searchedItems],
  );

  const filteredItems = useMemo(() => searchedItems.length === 0 ? [] : filteredAndSortedResponses(searchedItems, filter), [searchedItems, filter]);

  useEffect(() => {    
    setListItems(filteredItems);
  }, [filteredItems, setListItems])
  
  return {
    isEmpty: filteredItems.length === 0,
    searchedItemsCounts,
  };
};
