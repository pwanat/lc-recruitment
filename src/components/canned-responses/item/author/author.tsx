import { SkeletonAvatar, SkeletonText } from '@livechat/design-system-react-components';
import { useMemo } from 'react';

import { AgentAvatar } from '../../../avatar/AgentAvatar';
import useItemAuthor from '../use-item-author';

import * as styles from '../../styles';

type Props = {
  id: string;
  lastAction: string;
  lastDate: string;
};

const Author = ({ id, lastAction, lastDate }: Props) => {
  const { data, isLoading } = useItemAuthor(id);
  const authorName = data?.name ? `${data?.name.first} ${data?.name.last}` : 'Unknown';
  const avatarUrl = useMemo(() => data?.picture.thumbnail, [data?.picture.thumbnail]);

  return (
    <div className={styles.author}>
      <div className={styles.avatarContainer}>
        {isLoading ? (
          <SkeletonAvatar size={20} />
        ) : (
          <AgentAvatar src={avatarUrl} size="xxsmall" className={styles.avatar} />
        )}
      </div>
      {lastAction} by
      {isLoading ? (
        <span className={styles.authorNameSkeleton}>
          <SkeletonText width={100} />
        </span>
      ) : (
        <span className={styles.authorName}>{authorName}</span>
      )}
      , {lastDate}
    </div>
  );
};

export default Author;
