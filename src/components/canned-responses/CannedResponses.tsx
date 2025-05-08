import { EmptyState } from '../empty-state/EmptyState';
import { useCannedResponses } from '../../hooks/use-canned-responses';
import * as styles from './styles';
import Filters from './filters/Filters';
import List from './list/List';

export const CannedResponses = () => {
  const { isEmpty, searchedItemsCounts } = useCannedResponses();

  return (
    <div className={styles.wrapper}>
      <Filters searchedItemsCounts={searchedItemsCounts} />

      <div className={styles.list}>
        {isEmpty ? (
          <EmptyState
            icon={true}
            title="No canned responses"
            description="Save frequently used responses under a simple shortcut"
            className={styles.emptyState}
          />
        ) : (
          <List />
        )}
      </div>
    </div>
  );
};
