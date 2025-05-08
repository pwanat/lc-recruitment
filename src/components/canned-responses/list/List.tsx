import useCannedStore from '../../../store/canned-store';
import { memo, useEffect, useRef } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';

import * as styles from './styles';
import { CannedResponseItem } from '../item/Item';

const ESTIMATED_ITEM_HEIGHT = 170;

const List = memo(() => {
  const listItems = useCannedStore((state) => state.listItems);

  const parentRef = useRef<HTMLDivElement>(null);

  const count = listItems.length;

  const virtualizer = useVirtualizer({
    count,
    getScrollElement: () => parentRef.current,
    estimateSize: () => ESTIMATED_ITEM_HEIGHT,
  });

  const items = virtualizer.getVirtualItems();

  // Scroll to the top when the list items are filtered
  useEffect(() => {
    virtualizer.scrollToIndex(0);
  }, [listItems, virtualizer])
  

  return (
    <div ref={parentRef} className={styles.virtualizerWrapper}>
      <div
        className={styles.virtualizerSizer}
        style={{
          height: virtualizer.getTotalSize(),
        }}
      >
        <div
          className={styles.virtualizerList}
          style={{
            transform: `translateY(${items[0]?.start ?? 0}px)`,
          }}
        >
          {items.map((virtualRow) => (
            <div key={virtualRow.key} data-index={virtualRow.index} ref={virtualizer.measureElement}>
              <CannedResponseItem {...listItems[virtualRow.index]} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

export default List;
