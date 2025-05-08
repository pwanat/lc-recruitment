import { useEffect } from 'react';
import { SearchInput, SegmentedControl } from '@livechat/design-system-react-components';

import * as styles from './styles';
import { useDebounce } from 'use-debounce';
import useCannedStore from '../../../store/canned-store';
import { CannedResponseFilterType } from '../../../types/filter-type';
import { getCannedResponsesButtons } from '../../canned-responses-buttons/configuration';
import { ResponsesCounts } from '../../../types/canned-responses';

type Props = {
  searchedItemsCounts: ResponsesCounts
};

const Filters = ({searchedItemsCounts}: Props) => {
  
  const searchString = useCannedStore((state) => state.searchString);
  const setSearchString = useCannedStore((state) => state.setSearchString);
  const setSearch = useCannedStore((state) => state.setSearch);
  const filter = useCannedStore((state) => state.filter);
  const setFilter = useCannedStore((state) => state.setFilter);

  const [searchDebounced] = useDebounce(searchString, 300);

  useEffect(() => {
    setSearch(searchDebounced);
  }, [searchDebounced, setSearch]);

  return (
    <div className={styles.actionBar}>
      <div className={styles.barContainer}>
        <div className={styles.segmentedControllButtonTopSpace}></div>
        <SegmentedControl
          initialId="all"
          currentId={filter}
          className={styles.segmentedControlButton}
          buttons={getCannedResponsesButtons(searchedItemsCounts)}
          onButtonClick={(id) => setFilter(id as CannedResponseFilterType)}
        />
      </div>
      <SearchInput onChange={setSearchString} value={searchString} className={styles.searchBar} />
    </div>
  );
};

export default Filters;
