import { CannedResponseItem } from '../CannedResponseItem';
import useCannedStore from '../../../store/canned-store';
import { memo } from 'react';

const List = memo(() => {
  const listItems = useCannedStore((state) => state.listItems);
  console.log('rerender list items', listItems);

  return (
    <>
      {listItems.map((item) => (
        <CannedResponseItem key={item.id} item={item} />
      ))}
    </>
  );
});

export default List;
