import { useMemo, useEffect } from 'react';
import { ResponsesCounts } from '../../types/canned-responses';
import { privacyFilterCannedResponses } from '../../hooks/helpers/privacy-filter-canned-responses';
import useCannedStore from '../../store/canned-store';
import { filteredAndSortedResponses, searchInItem } from './helpers';

export interface UseCannedResponses {
  isEmpty: boolean;
  searchedItemsCounts: ResponsesCounts;
}

export const useCannedResponses = (): UseCannedResponses => {
  const items = Object.values(useCannedStore((state) => state.byIds));

  const filter = useCannedStore((state) => state.filter);
  const search = useCannedStore((state) => state.search);
  const setListItems = useCannedStore((state) => state.setListItems);

  const searchedItems = useMemo(
    () => (!search ? items : items.filter((item) => searchInItem(item, search))),
    [items, search],
  );

  const searchedItemsCounts = useMemo(
    () => ({
      allCount: searchedItems.length,
      sharedCount: privacyFilterCannedResponses(searchedItems, 'shared').length,
      privateCount: privacyFilterCannedResponses(searchedItems, 'private').length,
    }),
    [searchedItems],
  );

  const filteredItems = useMemo(
    () => (searchedItems.length === 0 ? [] : filteredAndSortedResponses(searchedItems, filter)),
    [searchedItems, filter],
  );

  useEffect(() => {
    setListItems(filteredItems);
  }, [filteredItems, setListItems]);

  return {
    isEmpty: filteredItems.length === 0,
    searchedItemsCounts,
  };
};
